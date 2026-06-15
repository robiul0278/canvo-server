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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const counter_schema_1 = require("./counter.schema");
const product_schema_1 = require("../products/product.schema");
const query_helper_1 = require("../../common/helpers/query.helper");
let OrderService = class OrderService {
    orderModel;
    counterModel;
    productModel;
    constructor(orderModel, counterModel, productModel) {
        this.orderModel = orderModel;
        this.counterModel = counterModel;
        this.productModel = productModel;
    }
    async generateOrderNumber() {
        const year = new Date().getFullYear();
        const counter = await this.counterModel.findOneAndUpdate({ key: `orderCounter-${year}` }, { $inc: { seq: 1 }, $setOnInsert: { key: `orderCounter-${year}`, year } }, { upsert: true, new: true, setDefaultsOnInsert: true });
        const seq = String(counter.seq).padStart(5, '0');
        return `CANVO-${year}-${seq}`;
    }
    async create(dto, userId) {
        const orderNumber = await this.generateOrderNumber();
        const district = dto.deliveryAddress.district.toLowerCase();
        const isDhaka = district === 'dhaka' || district.includes('dhaka');
        const deliveryCharge = dto.subtotal > 2000 ? 0 : isDhaka ? 60 : 120;
        const totalAmount = dto.subtotal - (dto.discountAmount || 0) + deliveryCharge;
        for (const item of dto.items) {
            const product = await this.productModel.findById(item.product);
            if (!product) {
                throw new common_1.BadRequestException(`Product ${item.productName} not found`);
            }
            const variation = product.variations.find((v) => v.color === item.variation?.color);
            if (!variation) {
                throw new common_1.BadRequestException(`Variation "${item.variation?.color}" not found for ${item.productName}`);
            }
            const sizeEntry = variation.sizes.find((s) => s.size === item.variation?.size);
            if (!sizeEntry) {
                throw new common_1.BadRequestException(`Size "${item.variation?.size}" not found for ${item.productName} (${item.variation?.color})`);
            }
            if (sizeEntry.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${item.productName} (${item.variation?.color} / ${item.variation?.size}). Available: ${sizeEntry.stock}, requested: ${item.quantity}`);
            }
        }
        if (dto.paymentMethod === 'cod') {
            await this.deductStock(dto.items);
        }
        const orderData = {
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
    async deductStock(items) {
        for (const item of items) {
            await this.productModel.findOneAndUpdate({
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
            }, {
                $inc: {
                    'variations.$[v].sizes.$[s].stock': -item.quantity,
                },
            }, {
                arrayFilters: [
                    { 'v.color': item.variation?.color },
                    { 's.size': item.variation?.size },
                ],
            });
        }
    }
    async findByUser(userId) {
        return this.orderModel
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByOrderNumber(orderNumber, userId) {
        const filter = { orderNumber };
        if (userId)
            filter.user = userId;
        const order = await this.orderModel.findOne(filter).exec();
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async findAll(query) {
        const filter = query_helper_1.QueryHelper.combine(query_helper_1.QueryHelper.buildTextSearch(['orderNumber', 'guestInfo.name', 'guestInfo.email'], query.search), query_helper_1.QueryHelper.buildMatchFilter('orderStatus', query.orderStatus), query_helper_1.QueryHelper.buildMatchFilter('paymentStatus', query.paymentStatus), query_helper_1.QueryHelper.buildMatchFilter('paymentMethod', query.paymentMethod));
        return query_helper_1.QueryHelper.paginate(this.orderModel, filter, {
            page: query.page,
            limit: query.limit,
            sort: query_helper_1.QueryHelper.buildSort(query.sort, { createdAt: -1 }),
            populate: { path: 'user', select: 'name email' },
        });
    }
    async findById(id) {
        const order = await this.orderModel.findById(id).exec();
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(id, dto, updatedBy) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.orderStatus = dto.status;
        order.statusHistory.push({
            status: dto.status,
            note: dto.note || '',
            updatedBy: updatedBy,
            updatedAt: new Date(),
        });
        return order.save();
    }
    async updateTracking(id, trackingNumber) {
        const order = await this.orderModel.findByIdAndUpdate(id, { trackingNumber }, { new: true });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async cancelOrder(orderNumber, userId) {
        const order = await this.orderModel.findOne({ orderNumber, user: userId });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.orderStatus !== 'pending') {
            throw new common_1.BadRequestException('Only pending orders can be cancelled');
        }
        order.orderStatus = 'cancelled';
        order.statusHistory.push({
            status: 'cancelled',
            note: 'Cancelled by customer',
            updatedBy: userId,
            updatedAt: new Date(),
        });
        await order.save();
        for (const item of order.items) {
            await this.productModel.findOneAndUpdate({ _id: item.product }, {
                $inc: {
                    'variations.$[v].sizes.$[s].stock': item.quantity,
                },
            }, {
                arrayFilters: [
                    { 'v.color': item.variation?.color },
                    { 's.size': item.variation?.size },
                ],
            });
        }
        return order;
    }
    async getDashboardStats() {
        const [totalOrders, totalRevenueResult, todayOrders, todayRevenueResult] = await Promise.all([
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(counter_schema_1.Counter.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map