import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDtoType } from './dto/create-product.dto';
import { QueryProductDtoType } from './dto/query-product.dto';
import { ImageProcessorService } from './image-processor.service';
import { QueryHelper } from '../../common/helpers/query.helper';
import { Category, CategoryDocument } from '../categories/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }

  async create(dto: CreateProductDtoType, userId: string) {
    const slug =
      dto.slug ||
      this.generateSlug(dto.name) + '-' + Date.now().toString(36);

    const existing = await this.productModel.findOne({ slug });
    if (existing) {
      throw new BadRequestException('Product with this slug already exists');
    }

    const product = new this.productModel({
      ...dto,
      slug,
      category: dto.category,
      createdBy: userId,
      publishedAt: dto.isPublished ? new Date() : undefined,
    });

    return product.save();
  }

  async findAll(query: QueryProductDtoType) {
    let categoryId = query.category;
    if (categoryId && !categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      const cat = await this.categoryModel.findOne({ slug: categoryId }).select('_id').exec();
      if (cat) categoryId = cat._id.toString();
    }

    const filter = QueryHelper.combine(
      QueryHelper.buildTextSearch(['name', 'description'], query.search),
      QueryHelper.buildMatchFilter('category', categoryId),
      QueryHelper.buildMatchFilter('tags', query.tag),
      QueryHelper.buildMatchFilter('variations.color', query.color),
      QueryHelper.buildMatchFilter('variations.sizes.size', query.size),
      QueryHelper.buildRangeFilter('basePrice', query.minPrice, query.maxPrice),
    );

    return QueryHelper.paginate(this.productModel, filter, {
      page: query.page,
      limit: query.limit,
      sort: QueryHelper.buildSort(query.sort),
      populate: { path: 'category', select: 'name slug' },
    });
  }

  async findFeatured() {
    return this.productModel
      .find({ isFeatured: true, isPublished: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(8)
      .exec();
  }

  async findNewArrivals() {
    return this.productModel
      .find({ isNewArrival: true, isPublished: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(8)
      .exec();
  }

  async findBySlug(slug: string) {
    const product = await this.productModel
      .findOne({ slug, isPublished: true })
      .populate('category', 'name slug')
      .exec();

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: Partial<CreateProductDtoType>) {
    const updateData: any = { ...dto };
    if (dto.isPublished && !dto.isPublished === undefined) {
      updateData.publishedAt = new Date();
    }

    const product = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return { deleted: true };
  }

  async removeImage(productId: string, imageId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    let foundImage: any = null;
    for (const variation of product.variations) {
      const imgIdx = (variation.images as any).findIndex(
        (img: any) => img._id.toString() === imageId,
      );
      if (imgIdx !== -1) {
        foundImage = variation.images[imgIdx];
        variation.images.splice(imgIdx, 1);
        break;
      }
    }

    if (!foundImage) {
      throw new NotFoundException('Image not found');
    }

    if (foundImage.url) {
      await this.imageProcessor.deleteProductImage(foundImage.url);
    }

    await product.save();
    return { success: true, message: 'Image deleted' };
  }

  async reorderImages(productId: string, variationIndex: number, imageIds: string[]) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const variation = product.variations[variationIndex];
    if (!variation) {
      throw new NotFoundException('Variation not found');
    }

    const reordered: any[] = [];
    for (const id of imageIds) {
      const img = (variation.images as any).find(
        (i: any) => i._id.toString() === id,
      );
      if (img) {
        reordered.push(img);
      }
    }

    const remaining = (variation.images as any).filter(
      (i: any) => !imageIds.includes(i._id.toString()),
    );

    variation.images = [...reordered, ...remaining] as any;
    (variation.images as any).forEach((img: any, idx: number) => {
      img.order = idx;
    });

    await product.save();
    return { success: true, message: 'Images reordered' };
  }

  async findDashboardAll() {
    return this.productModel
      .find()
      .populate('category', 'name slug')
      .sort({ updatedAt: -1 })
      .exec();
  }
}
