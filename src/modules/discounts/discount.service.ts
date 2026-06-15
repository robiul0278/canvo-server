import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount, DiscountDocument } from './discount.schema';
import { CreateDiscountDtoType } from './dto/create-discount.dto';
import { ValidateCouponDtoType } from './dto/validate-coupon.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
    @InjectModel('Product') private productModel: Model<any>,
  ) {}

  async create(dto: CreateDiscountDtoType, userId: string) {
    if (dto.type === 'coupon_code' && !dto.code) {
      throw new BadRequestException('Coupon code is required for coupon type');
    }

    const discount = new this.discountModel({
      ...dto,
      createdBy: userId,
    });

    return discount.save();
  }

  async findAll() {
    return this.discountModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(id: string, dto: Partial<CreateDiscountDtoType>) {
    const discount = await this.discountModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!discount) throw new NotFoundException('Discount not found');
    return discount;
  }

  async remove(id: string) {
    const discount = await this.discountModel.findByIdAndDelete(id).exec();
    if (!discount) throw new NotFoundException('Discount not found');
    return { deleted: true };
  }

  async validateCoupon(dto: ValidateCouponDtoType) {
    const now = new Date();

    const discount = await this.discountModel
      .findOne({
        code: dto.code.toUpperCase(),
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .exec();

    if (!discount) {
      return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon code' };
    }

    if (discount.usageLimit > 0 && discount.usageCount >= discount.usageLimit) {
      return { valid: false, discountAmount: 0, message: 'Coupon usage limit reached' };
    }

    if (dto.orderAmount < discount.minOrderAmount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Minimum order amount is ৳${discount.minOrderAmount}`,
      };
    }

    let discountAmount = 0;

    if (discount.discountType === 'percentage') {
      discountAmount = (dto.orderAmount * discount.discountValue) / 100;
      if (discount.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscountAmount);
      }
    } else {
      discountAmount = Math.min(discount.discountValue, dto.orderAmount);
    }

    if (discount.applicableTo === 'category') {
      if (dto.productIds?.length && discount.categories?.length) {
        const products = await this.productModel
          .find({ _id: { $in: dto.productIds } })
          .select('category')
          .exec();
        const hasMatchingCategory = products.some((p: any) =>
          discount.categories.some((dc) => dc.toString() === p.category?.toString()),
        );
        if (!hasMatchingCategory) {
          return { valid: false, discountAmount: 0, message: 'Coupon does not apply to products in this category' };
        }
      }
    }

    if (discount.applicableTo === 'specific_products') {
      if (dto.productIds?.length && discount.products?.length) {
        const hasOverlap = dto.productIds.some((pid) =>
          discount.products.some((dp) => dp.toString() === pid),
        );
        if (!hasOverlap) {
          return { valid: false, discountAmount: 0, message: 'Coupon does not apply to these products' };
        }
      }
    }

    discount.usageCount += 1;
    await discount.save();

    return {
      valid: true,
      discountAmount: Math.round(discountAmount),
      message: `Coupon applied! You saved ৳${Math.round(discountAmount)}`,
    };
  }
}
