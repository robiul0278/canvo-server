import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { Order, OrderDocument } from '../orders/order.schema';
import { QueryReviewDtoType } from './dto/query-review.dto';
import { QueryHelper } from '../../common/helpers/query.helper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(
    dto: {
      product: string;
      rating: number;
      title?: string;
      comment?: string;
      images?: string[];
    },
    userId: string,
  ) {
    const existing = await this.reviewModel
      .findOne({ user: userId, product: dto.product })
      .exec();

    if (existing) {
      throw new BadRequestException('You have already reviewed this product');
    }

    const verifiedOrder = await this.orderModel
      .findOne({
        user: userId as any,
        'items.product': dto.product as any,
        orderStatus: { $in: ['delivered', 'shipped'] },
      })
      .exec();

    const review = new this.reviewModel({
      ...dto,
      user: userId,
      isVerifiedPurchase: !!verifiedOrder,
    });

    return review.save();
  }

  async findByProduct(productId: string) {
    return this.reviewModel
      .find({ product: productId, isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findAll(query: QueryReviewDtoType) {
    const filter = QueryHelper.combine(
      query.isApproved !== undefined
        ? QueryHelper.buildMatchFilter('isApproved', query.isApproved)
        : undefined,
      QueryHelper.buildMatchFilter('rating', query.rating),
      QueryHelper.buildTextSearch(['title', 'comment'], query.search),
    );

    return QueryHelper.paginate(this.reviewModel, filter, {
      page: query.page,
      limit: query.limit,
      sort: QueryHelper.buildSort(query.sort, { createdAt: -1 }),
      populate: [
        { path: 'user', select: 'name email' },
        { path: 'product', select: 'name slug' },
      ],
    });
  }

  async approve(id: string) {
    const review = await this.reviewModel.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    review.isApproved = true;
    await review.save();

    await this.updateProductRatings(review.product.toString());

    return review;
  }

  async reply(id: string, adminReply: string) {
    const review = await this.reviewModel.findByIdAndUpdate(
      id,
      { adminReply },
      { new: true },
    );
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async remove(id: string) {
    const review = await this.reviewModel.findByIdAndDelete(id);
    if (!review) throw new NotFoundException('Review not found');

    await this.updateProductRatings(review.product.toString());

    return { deleted: true };
  }

  private async updateProductRatings(productId: string) {
    const result = await this.reviewModel
      .aggregate([
        { $match: { product: productId as any, isApproved: true } },
        {
          $group: {
            _id: '$product',
            average: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    if (result.length > 0) {
      await this.productModel
        .findByIdAndUpdate(productId, {
          ratings: {
            average: Math.round(result[0].average * 10) / 10,
            count: result[0].count,
          },
        })
        .exec();
    } else {
      await this.productModel
        .findByIdAndUpdate(productId, {
          ratings: { average: 0, count: 0 },
        })
        .exec();
    }
  }
}
