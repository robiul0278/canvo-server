"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../orders/order.schema");
const product_schema_1 = require("../products/product.schema");
const user_schema_1 = require("../users/user.schema");
let DashboardService = class DashboardService {
    orderModel;
    productModel;
    userModel;
    constructor(orderModel, productModel, userModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.userModel = userModel;
    }
    async getOverview() {
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const [totalRevenueResult, todayRevenueResult, totalOrders, todayOrders, totalCustomers, newCustomersThisMonth, pendingOrders,] = await Promise.all([
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
    async getRevenueChart(period) {
        let days;
        switch (period) {
            case '7d':
                days = 7;
                break;
            case '30d':
                days = 30;
                break;
            case '90d':
                days = 90;
                break;
            case '1y':
                days = 365;
                break;
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
        const alerts = [];
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
        const counts = await Promise.all(statuses.map((status) => this.orderModel.countDocuments({ orderStatus: status }).exec()));
        const breakdown = {};
        statuses.forEach((status, i) => {
            breakdown[status] = counts[i];
        });
        return breakdown;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map