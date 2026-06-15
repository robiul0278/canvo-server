import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/order.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getOverview() {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalRevenueResult,
      todayRevenueResult,
      totalOrders,
      todayOrders,
      totalCustomers,
      newCustomersThisMonth,
      pendingOrders,
    ] = await Promise.all([
      this.orderModel
        .aggregate([
          { $match: { paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ])
        .exec(),
      this.orderModel
        .aggregate([
          {
            $match: {
              paymentStatus: 'paid',
              createdAt: { $gte: todayStart },
            },
          },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ])
        .exec(),
      this.orderModel.countDocuments().exec(),
      this.orderModel.countDocuments({ createdAt: { $gte: todayStart } }).exec(),
      this.userModel.countDocuments().exec(),
      this.userModel.countDocuments({ createdAt: { $gte: monthStart } }).exec(),
      this.orderModel.countDocuments({ orderStatus: 'pending' }).exec(),
    ]);

    const lowStockProducts = await this.productModel
      .find({
        'variations.sizes.stock': { $lt: 5 },
      })
      .countDocuments()
      .exec();

    const totalOrdersCount = totalOrders || 1;
    const deliveredOrders = await this.orderModel
      .countDocuments({ orderStatus: 'delivered' })
      .exec();

    return {
      totalRevenue: totalRevenueResult[0]?.total || 0,
      todayRevenue: todayRevenueResult[0]?.total || 0,
      totalOrders,
      todayOrders,
      totalCustomers,
      newCustomersThisMonth,
      pendingOrders,
      lowStockProducts,
      conversionRate: Math.round((deliveredOrders / totalOrdersCount) * 100),
    };
  }

  async getRevenueChart(period: string) {
    let days: number;
    switch (period) {
      case '7d': days = 7; break;
      case '30d': days = 30; break;
      case '90d': days = 90; break;
      case '1y': days = 365; break;
      default: days = 30;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await this.orderModel
      .aggregate([
        {
          $match: {
            paymentStatus: 'paid',
            createdAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            revenue: { $sum: '$totalAmount' },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();

    return {
      labels: result.map((r) => r._id),
      data: result.map((r) => r.revenue),
    };
  }

  async getTopProducts(limit = 5) {
    return this.orderModel
      .aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            productName: { $first: '$items.productName' },
            totalSold: { $sum: '$items.quantity' },
            totalRevenue: { $sum: '$items.totalPrice' },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: limit },
      ])
      .exec();
  }

  async getRecentOrders(limit = 10) {
    return this.orderModel
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getStockAlerts() {
    const products = await this.productModel
      .find({
        'variations.sizes.stock': { $lt: 5 },
      })
      .select('name slug variations')
      .exec();

    const alerts: any[] = [];

    for (const product of products) {
      for (const variation of product.variations) {
        for (const size of variation.sizes) {
          if (size.stock < 5) {
            alerts.push({
              product: { _id: product._id, name: product.name, slug: product.slug },
              variation: { color: variation.color, colorHex: variation.colorHex },
              size: size.size,
              stock: size.stock,
            });
          }
        }
      }
    }

    return alerts.sort((a, b) => a.stock - b.stock);
  }

  async getOrderStatusBreakdown() {
    const statuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned',
    ];

    const counts = await Promise.all(
      statuses.map((status) =>
        this.orderModel.countDocuments({ orderStatus: status }).exec(),
      ),
    );

    const breakdown: Record<string, number> = {};
    statuses.forEach((status, i) => {
      breakdown[status] = counts[i];
    });

    return breakdown;
  }
}
