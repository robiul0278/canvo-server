import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type FrontendContentDocument = FrontendContent & Document;

@Schema({ timestamps: true })
export class FrontendContent {
  @Prop({
    enum: [
      'hero',
      'announcement_bar',
      'featured_section',
      'promo_banner',
      'footer',
      'social_links',
    ],
    required: true,
    unique: true,
  })
  section: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  data: Record<string, any>;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const FrontendContentSchema =
  SchemaFactory.createForClass(FrontendContent);
