import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
export class OrderItemVariation {
  @Prop()
  color: string;

  @Prop()
  colorHex: string;

  @Prop()
  size: string;

  @Prop()
  imageUrl: string;
}

export const OrderItemVariationSchema =
  SchemaFactory.createForClass(OrderItemVariation);

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop()
  productSlug: string;

  @Prop({ type: OrderItemVariationSchema })
  variation: OrderItemVariation;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ _id: false })
export class DeliveryAddress {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  thana: string;

  @Prop({ required: true })
  address: string;
}

export const DeliveryAddressSchema =
  SchemaFactory.createForClass(DeliveryAddress);

@Schema({ _id: false })
export class StatusHistoryEntry {
  @Prop({ required: true })
  status: string;

  @Prop()
  note: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StatusHistoryEntrySchema =
  SchemaFactory.createForClass(StatusHistoryEntry);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({
    type: { name: String, email: String, phone: String },
  })
  guestInfo: { name: string; email: string; phone: string };

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  subtotal: number;

  @Prop()
  discountCode: string;

  @Prop({ default: 0 })
  discountAmount: number;

  @Prop({ required: true })
  deliveryCharge: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ enum: ['sslcommerz', 'cod'], required: true })
  paymentMethod: string;

  @Prop({
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  })
  paymentStatus: string;

  @Prop({
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned',
    ],
    default: 'pending',
  })
  orderStatus: string;

  @Prop({ type: DeliveryAddressSchema, required: true })
  deliveryAddress: DeliveryAddress;

  @Prop()
  trackingNumber: string;

  @Prop()
  notes: string;

  @Prop()
  sslczTransactionId: string;

  @Prop({ type: [StatusHistoryEntrySchema], default: [] })
  statusHistory: StatusHistoryEntry[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
