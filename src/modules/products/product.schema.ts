import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
export class ProductImage {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  isDefault: boolean;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);

@Schema({ _id: false })
export class ProductSize {
  @Prop({ required: true })
  size: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  priceOverride: number;
}

export const ProductSizeSchema = SchemaFactory.createForClass(ProductSize);

@Schema({ _id: false })
export class ProductVariation {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  colorHex: string;

  @Prop({ type: [ProductImageSchema], default: [] })
  images: ProductImage[];

  @Prop({ type: [ProductSizeSchema], default: [] })
  sizes: ProductSize[];
}

export const ProductVariationSchema =
  SchemaFactory.createForClass(ProductVariation);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  shortDescription: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  basePrice: number;

  @Prop({ enum: ['none', 'percentage', 'flat'], default: 'none' })
  discountType: string;

  @Prop({ default: 0 })
  discountValue: number;

  @Prop({ type: [ProductVariationSchema], default: [] })
  variations: ProductVariation[];

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isNewArrival: boolean;

  @Prop({ default: false })
  isBestseller: boolean;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  publishedAt: Date;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop({
    type: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
    default: { average: 0, count: 0 },
  })
  ratings: { average: number; count: number };

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  virtuals: {
    finalPrice: number;
    totalStock: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('finalPrice').get(function (this: ProductDocument) {
  if (this.discountType === 'percentage') {
    return this.basePrice - (this.basePrice * this.discountValue) / 100;
  }
  if (this.discountType === 'flat') {
    return Math.max(0, this.basePrice - this.discountValue);
  }
  return this.basePrice;
});

ProductSchema.virtual('totalStock').get(function (this: ProductDocument) {
  return this.variations.reduce((total, v) => {
    return total + v.sizes.reduce((sTotal, s) => sTotal + s.stock, 0);
  }, 0);
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
