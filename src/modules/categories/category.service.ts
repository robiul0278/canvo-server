import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloudName'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);
  }

  async findAll() {
    return this.categoryModel
      .find({ isVisible: true })
      .sort({ order: 1, name: 1 })
      .populate('productCount')
      .exec();
  }

  async findAllAdmin() {
    return this.categoryModel
      .find()
      .sort({ order: 1, name: 1 })
      .populate('productCount')
      .exec();
  }

  async findBySlug(slug: string) {
    const category = await this.categoryModel
      .findOne({ slug })
      .populate('productCount')
      .exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: { name: string; image?: string; icon?: string }) {
    const count = await this.categoryModel.countDocuments();
    if (count >= 12) {
      throw new BadRequestException('Maximum 12 categories allowed');
    }

    const slug = this.generateSlug(dto.name);

    const existing = await this.categoryModel.findOne({ slug });
    if (existing) {
      throw new BadRequestException('Category with this name already exists');
    }

    const category = await this.categoryModel.create({ ...dto, slug });
    return this.categoryModel.findById(category._id).populate('productCount').exec();
  }

  async update(id: string, dto: Partial<{ name: string; image: string; icon: string; order: number; isVisible: boolean }>) {
    const updateData: any = { ...dto };
    if (dto.name) {
      updateData.slug = this.generateSlug(dto.name);
    }

    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('productCount')
      .exec();

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async remove(id: string) {
    const productCount = await this.productModel.countDocuments({ category: id });
    if (productCount > 0) {
      throw new BadRequestException(
        `Cannot delete category with ${productCount} product(s). Edit or reassign them first.`,
      );
    }

    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return { deleted: true };
  }

  async reorder(items: { id: string; order: number }[]) {
    const ops = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    await this.categoryModel.bulkWrite(ops);
    return { success: true };
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'canvo/categories',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(new BadRequestException(error.message));
          else resolve(result);
        },
      );
      stream.end(file.buffer);
    });

    category.image = result.secure_url;
    await category.save();

    return this.categoryModel.findById(category._id).populate('productCount').exec();
  }
}
