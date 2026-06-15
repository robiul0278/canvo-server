import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Counter, CounterDocument } from './counter.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { CreateOrderDtoType } from './dto/create-order.dto';
import { UpdateStatusDtoType } from './dto/update-status.dto';
import { QueryOrderDtoType } from './dto/query-order.dto';
import { QueryHelper } from '../../common/helpers/query.helper';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const counter = await this.counterModel.findOneAndUpdate(
      { key: `orderCounter-${year}` },
      { $inc: { seq: 1 }, $setOnInsert: { key: `orderCounter-${year}`, year } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    const seq = String(counter.seq).padStart(5, '0');
    return `CANVO-${year}-${seq}`;
  }

  async create(dto: CreateOrderDtoType, userId?: string) {
    const orderNumber = await this.generateOrderNumber();
    const district = dto.deliveryAddress.district.toLowerCase();
    const isDhaka = district === 'dhaka' || district.includes('dhaka');
    const deliveryCharge = dto.subtotal > 2000 ? 0 : isDhaka ? 60 : 120;
    const totalAmount = dto.subtotal - (dto.discountAmount || 0) + deliveryCharge;

    for (const item of dto.items) {
      const product = await this.productModel.findById(item.product);
      if (!product) {
        throw new BadRequestException(`Product ${item.productName} not found`);
      }

      const variation = product.variations.find(
        (v) => v.color === item.variation?.color,
      );
      if (!variation) {
        throw new BadRequestException(
          `Variation "${item.variation?.color}" not found for ${item.productName}`,
        );
      }

      const sizeEntry = variation.sizes.find(
        (s) => s.size === item.variation?.size,
      );
      if (!sizeEntry) {
        throw new BadRequestException(
          `Size "${item.variation?.size}" not found for ${item.productName} (${item.variation?.color})`,
        );
      }

      if (sizeEntry.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${item.productName} (${item.variation?.color} / ${item.variation?.size}). Available: ${sizeEntry.stock}, requested: ${item.quantity}`,
        );
      }
    }

    if (dto.paymentMethod === 'cod') {
      await this.deductStock(dto.items);
    }

    const orderData: any = {
      ...dto,
      orderNumber,
      user: userId || undefined,
      deliveryCharge,
      totalAmount: Math.max(0, totalAmount),
      statusHistory: [
        {
          status: 'pending',
          note: 'Order placed',
          updatedAt: new Date(),
        },
      ],
    };

    if (dto.paymentMethod === 'cod') {
      orderData.orderStatus = 'confirmed';
      orderData.statusHistory.push({
        status: 'confirmed',
        note: 'Cash on Delivery - auto confirmed',
        updatedAt: new Date(),
      });
    }

    const order = new this.orderModel(orderData);
    return order.save();
  }

  private async deductStock(
    items: CreateOrderDtoType['items'],
  ) {
    for (const item of items) {
      await this.productModel.findOneAndUpdate(
        {
          _id: item.product,
          variations: {
            $elemMatch: {
              color: item.variation?.color,
              sizes: {
                $elemMatch: {
                  size: item.variation?.size,
                  stock: { $gte: item.quantity },
                },
              },
            },
          },
        },
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

  async findByUser(userId: string) {
    return this.orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByOrderNumber(orderNumber: string, userId?: string) {
    const filter: any = { orderNumber };
    if (userId) filter.user = userId;

    const order = await this.orderModel.findOne(filter).exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findAll(query: QueryOrderDtoType) {
    const filter = QueryHelper.combine(
      QueryHelper.buildTextSearch(['orderNumber', 'guestInfo.name', 'guestInfo.email'], query.search),
      QueryHelper.buildMatchFilter('orderStatus', query.orderStatus),
      QueryHelper.buildMatchFilter('paymentStatus', query.paymentStatus),
      QueryHelper.buildMatchFilter('paymentMethod', query.paymentMethod),
    );

    return QueryHelper.paginate(this.orderModel, filter, {
      page: query.page,
      limit: query.limit,
      sort: QueryHelper.buildSort(query.sort, { createdAt: -1 }),
      populate: { path: 'user', select: 'name email' },
    });
  }

  async findById(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(
    id: string,
    dto: UpdateStatusDtoType,
    updatedBy: string,
  ) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Order not found');

    order.orderStatus = dto.status;
    order.statusHistory.push({
      status: dto.status,
      note: dto.note || '',
      updatedBy: updatedBy as any,
      updatedAt: new Date(),
    });

    return order.save();
  }

  async updateTracking(id: string, trackingNumber: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { trackingNumber },
      { new: true },
    );
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrder(orderNumber: string, userId: string) {
    const order = await this.orderModel.findOne({ orderNumber, user: userId });
    if (!order) throw new NotFoundException('Order not found');

    if (order.orderStatus !== 'pending') {
      throw new BadRequestException(
        'Only pending orders can be cancelled',
      );
    }

    order.orderStatus = 'cancelled';
    order.statusHistory.push({
      status: 'cancelled',
      note: 'Cancelled by customer',
      updatedBy: userId as any,
      updatedAt: new Date(),
    });

    await order.save();

    for (const item of order.items) {
      await this.productModel.findOneAndUpdate(
        { _id: item.product },
        {
          $inc: {
            'variations.$[v].sizes.$[s].stock': item.quantity,
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

    return order;
  }

  async getDashboardStats() {
    const [totalOrders, totalRevenueResult, todayOrders, todayRevenueResult] =
      await Promise.all([
        this.orderModel.countDocuments().exec(),
        this.orderModel
          .aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } },
          ])
          .exec(),
        this.orderModel
          .countDocuments({
            createdAt: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          })
          .exec(),
        this.orderModel
          .aggregate([
            {
              $match: {
                paymentStatus: 'paid',
                createdAt: {
                  $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
              },
            },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } },
          ])
          .exec(),
      ]);

    return {
      totalOrders,
      totalRevenue: totalRevenueResult[0]?.total || 0,
      todayOrders,
      todayRevenue: todayRevenueResult[0]?.total || 0,
    };
  }
}
