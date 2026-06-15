import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { SSLCommerzService } from './sslcommerz.service';
import { Order, OrderDocument } from '../orders/order.schema';
import { Product, ProductDocument } from '../products/product.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private sslCommerzService: SSLCommerzService,
    private configService: ConfigService,
  ) {}

  async initiatePayment(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (order.paymentMethod !== 'sslcommerz') {
      throw new HttpException(
        'Order is not set for SSLCommerz payment',
        HttpStatus.BAD_REQUEST,
      );
    }

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const backendUrl = this.configService.get<string>('BACKEND_URL') || 'http://localhost:5000';

    const customerInfo = order.user
      ? await this.getCustomerFromUser(order.user.toString())
      : order.guestInfo || { name: 'Guest', email: '', phone: '' };

    const response = await this.sslCommerzService.initiatePayment({
      totalAmount: order.totalAmount,
      tranId: order.orderNumber,
      successUrl: `${backendUrl}/api/payments/success`,
      failUrl: `${backendUrl}/api/payments/fail`,
      cancelUrl: `${backendUrl}/api/payments/cancel`,
      ipnUrl: `${backendUrl}/api/payments/ipn`,
      customerName: order.deliveryAddress.name,
      customerEmail: (customerInfo as any).email || '',
      customerPhone: order.deliveryAddress.phone,
      customerAddress: order.deliveryAddress.address,
      customerCity: order.deliveryAddress.district,
    });

    return {
      gatewayUrl: response?.GatewayPageURL || null,
      orderNumber: order.orderNumber,
    };
  }

  async handleSuccess(transactionId: string, orderNumber: string) {
    const isValid = await this.sslCommerzService.validateTransaction(transactionId);

    const order = await this.orderModel.findOne({ orderNumber });
    if (!order) {
      return { redirect: `${this.configService.get('FRONTEND_URL')}/order/failed` };
    }

    if (isValid) {
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      order.sslczTransactionId = transactionId;
      order.statusHistory.push({
        status: 'confirmed',
        note: 'Payment confirmed via SSLCommerz',
        updatedAt: new Date(),
      } as any);
      await order.save();

      for (const item of order.items) {
        await this.productModel.findOneAndUpdate(
          { _id: item.product },
          {
            $inc: {
              'variations.$[v].sizes.$[s].stock': -item.quantity,
            },
          },
          {
            arrayFilters: [
              { 'v.color': item.variation?.color },
              { 's.size': item.variation?.size },
            ],
          },
        );
      }

      return {
        redirect: `${this.configService.get('FRONTEND_URL')}/order/success?orderNumber=${orderNumber}`,
      };
    }

    order.paymentStatus = 'failed';
    await order.save();

    return {
      redirect: `${this.configService.get('FRONTEND_URL')}/order/failed`,
    };
  }

  async handleFail(orderNumber: string) {
    const order = await this.orderModel.findOne({ orderNumber });
    if (order) {
      order.paymentStatus = 'failed';
      await order.save();
    }

    return {
      redirect: `${this.configService.get('FRONTEND_URL')}/order/failed`,
    };
  }

  async handleCancel(orderNumber: string) {
    return {
      redirect: `${this.configService.get('FRONTEND_URL')}/cart`,
    };
  }

  async handleIpn(data: any) {
    if (!this.sslCommerzService.verifyIpn(data)) {
      return { error: 'Invalid IPN signature' };
    }

    if (data.status === 'VALID') {
      const order = await this.orderModel.findOne({ orderNumber: data.tran_id });
      if (order) {
        order.paymentStatus = 'paid';
        order.sslczTransactionId = data.val_id;
        await order.save();

        for (const item of order.items) {
          await this.productModel.findOneAndUpdate(
            { _id: item.product },
            {
              $inc: {
                'variations.$[v].sizes.$[s].stock': -item.quantity,
              },
            },
            {
              arrayFilters: [
                { 'v.color': item.variation?.color },
                { 's.size': item.variation?.size },
              ],
            },
          );
        }
      }
    }
  }

  private async getCustomerFromUser(userId: string): Promise<{ name: string; email: string }> {
    const user = await this.userModel.findById(userId).select('name email').exec();
    return user || { name: 'Unknown', email: '' };
  }
}
