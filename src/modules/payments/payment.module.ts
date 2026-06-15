import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SSLCommerzService } from './sslcommerz.service';
import { Order, OrderSchema } from '../orders/order.schema';
import { User, UserSchema } from '../users/user.schema';
import { Product, ProductSchema } from '../products/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, SSLCommerzService],
  exports: [PaymentService],
})
export class PaymentModule {}
