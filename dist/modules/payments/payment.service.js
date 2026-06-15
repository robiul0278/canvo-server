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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const sslcommerz_service_1 = require("./sslcommerz.service");
const order_schema_1 = require("../orders/order.schema");
const product_schema_1 = require("../products/product.schema");
let PaymentService = class PaymentService {
    orderModel;
    userModel;
    productModel;
    sslCommerzService;
    configService;
    constructor(orderModel, userModel, productModel, sslCommerzService, configService) {
        this.orderModel = orderModel;
        this.userModel = userModel;
        this.productModel = productModel;
        this.sslCommerzService = sslCommerzService;
        this.configService = configService;
    }
    async initiatePayment(orderId) {
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (order.paymentMethod !== 'sslcommerz') {
            throw new common_1.HttpException('Order is not set for SSLCommerz payment', common_1.HttpStatus.BAD_REQUEST);
        }
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        const backendUrl = this.configService.get('BACKEND_URL') || 'http://localhost:5000';
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
            customerEmail: customerInfo.email || '',
            customerPhone: order.deliveryAddress.phone,
            customerAddress: order.deliveryAddress.address,
            customerCity: order.deliveryAddress.district,
        });
        return {
            gatewayUrl: response?.GatewayPageURL || null,
            orderNumber: order.orderNumber,
        };
    }
    async handleSuccess(transactionId, orderNumber) {
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
            });
            await order.save();
            for (const item of order.items) {
                await this.productModel.findOneAndUpdate({ _id: item.product }, {
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
    async handleFail(orderNumber) {
        const order = await this.orderModel.findOne({ orderNumber });
        if (order) {
            order.paymentStatus = 'failed';
            await order.save();
        }
        return {
            redirect: `${this.configService.get('FRONTEND_URL')}/order/failed`,
        };
    }
    async handleCancel(orderNumber) {
        return {
            redirect: `${this.configService.get('FRONTEND_URL')}/cart`,
        };
    }
    async handleIpn(data) {
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
                    await this.productModel.findOneAndUpdate({ _id: item.product }, {
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
        }
    }
    async getCustomerFromUser(userId) {
        const user = await this.userModel.findById(userId).select('name email').exec();
        return user || { name: 'Unknown', email: '' };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        sslcommerz_service_1.SSLCommerzService,
        config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map