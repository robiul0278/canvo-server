import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true, default: 0 })
  seq: number;

  @Prop({ required: true })
  year: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
CounterSchema.index({ key: 1 }, { unique: true });
