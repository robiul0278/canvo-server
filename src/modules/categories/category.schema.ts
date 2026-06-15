import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: '📦' })
  icon: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isVisible: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('productCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true,
});
