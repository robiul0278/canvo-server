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
exports.DiscountSchema = exports.Discount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Discount = class Discount {
    type;
    code;
    title;
    description;
    discountType;
    discountValue;
    minOrderAmount;
    maxDiscountAmount;
    applicableTo;
    categories;
    products;
    startDate;
    endDate;
    usageLimit;
    usageCount;
    isActive;
    createdBy;
};
exports.Discount = Discount;
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['coupon_code', 'product_discount', 'flash_sale', 'bundle'],
        required: true,
    }),
    __metadata("design:type", String)
], Discount.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    __metadata("design:type", String)
], Discount.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Discount.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Discount.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['percentage', 'flat_amount'], required: true }),
    __metadata("design:type", String)
], Discount.prototype, "discountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Discount.prototype, "discountValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Discount.prototype, "minOrderAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Discount.prototype, "maxDiscountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['all', 'category', 'specific_products'], default: 'all' }),
    __metadata("design:type", String)
], Discount.prototype, "applicableTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Category' }] }),
    __metadata("design:type", Array)
], Discount.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product' }] }),
    __metadata("design:type", Array)
], Discount.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Discount.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Discount.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Discount.prototype, "usageLimit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Discount.prototype, "usageCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Discount.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Discount.prototype, "createdBy", void 0);
exports.Discount = Discount = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Discount);
exports.DiscountSchema = mongoose_1.SchemaFactory.createForClass(Discount);
//# sourceMappingURL=discount.schema.js.map