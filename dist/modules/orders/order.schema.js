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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = exports.StatusHistoryEntrySchema = exports.StatusHistoryEntry = exports.DeliveryAddressSchema = exports.DeliveryAddress = exports.OrderItemSchema = exports.OrderItem = exports.OrderItemVariationSchema = exports.OrderItemVariation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderItemVariation = class OrderItemVariation {
    color;
    colorHex;
    size;
    imageUrl;
};
exports.OrderItemVariation = OrderItemVariation;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItemVariation.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItemVariation.prototype, "colorHex", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItemVariation.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItemVariation.prototype, "imageUrl", void 0);
exports.OrderItemVariation = OrderItemVariation = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], OrderItemVariation);
exports.OrderItemVariationSchema = mongoose_1.SchemaFactory.createForClass(OrderItemVariation);
let OrderItem = class OrderItem {
    product;
    productName;
    productSlug;
    variation;
    quantity;
    unitPrice;
    totalPrice;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItem.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderItem.prototype, "productSlug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.OrderItemVariationSchema }),
    __metadata("design:type", OrderItemVariation)
], OrderItem.prototype, "variation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "totalPrice", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], OrderItem);
exports.OrderItemSchema = mongoose_1.SchemaFactory.createForClass(OrderItem);
let DeliveryAddress = class DeliveryAddress {
    name;
    phone;
    district;
    thana;
    address;
};
exports.DeliveryAddress = DeliveryAddress;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "district", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "thana", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "address", void 0);
exports.DeliveryAddress = DeliveryAddress = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DeliveryAddress);
exports.DeliveryAddressSchema = mongoose_1.SchemaFactory.createForClass(DeliveryAddress);
let StatusHistoryEntry = class StatusHistoryEntry {
    status;
    note;
    updatedBy;
    updatedAt;
};
exports.StatusHistoryEntry = StatusHistoryEntry;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StatusHistoryEntry.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StatusHistoryEntry.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StatusHistoryEntry.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], StatusHistoryEntry.prototype, "updatedAt", void 0);
exports.StatusHistoryEntry = StatusHistoryEntry = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], StatusHistoryEntry);
exports.StatusHistoryEntrySchema = mongoose_1.SchemaFactory.createForClass(StatusHistoryEntry);
let Order = class Order {
    orderNumber;
    user;
    guestInfo;
    items;
    subtotal;
    discountCode;
    discountAmount;
    deliveryCharge;
    totalAmount;
    paymentMethod;
    paymentStatus;
    orderStatus;
    deliveryAddress;
    trackingNumber;
    notes;
    sslczTransactionId;
    statusHistory;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { name: String, email: String, phone: String },
    }),
    __metadata("design:type", Object)
], Order.prototype, "guestInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.OrderItemSchema], required: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "discountCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryCharge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['sslcommerz', 'cod'], required: true }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.DeliveryAddressSchema, required: true }),
    __metadata("design:type", DeliveryAddress)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "trackingNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "sslczTransactionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.StatusHistoryEntrySchema], default: [] }),
    __metadata("design:type", Array)
], Order.prototype, "statusHistory", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map