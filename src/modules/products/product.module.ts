import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ImageProcessorService } from './image-processor.service';
import { Product, ProductSchema } from './product.schema';
import { Category, CategorySchema } from '../categories/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImageProcessorService],
  exports: [ProductService],
})
export class ProductModule {}
