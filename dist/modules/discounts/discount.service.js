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
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discount_schema_1 = require("./discount.schema");
let DiscountService = class DiscountService {
    discountModel;
    productModel;
    constructor(discountModel, productModel) {
        this.discountModel = discountModel;
        this.productModel = productModel;
    }
    async create(dto, userId) {
        if (dto.type === 'coupon_code' && !dto.code) {
            throw new common_1.BadRequestException('Coupon code is required for coupon type');
        }
        const discount = new this.discountModel({
            ...dto,
            createdBy: userId,
        });
        return discount.save();
    }
    async findAll() {
        return this.discountModel.find().sort({ createdAt: -1 }).exec();
    }
    async update(id, dto) {
        const discount = await this.discountModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!discount)
            throw new common_1.NotFoundException('Discount not found');
        return discount;
    }
    async remove(id) {
        const discount = await this.discountModel.findByIdAndDelete(id).exec();
        if (!discount)
            throw new common_1.NotFoundException('Discount not found');
        return { deleted: true };
    }
    async validateCoupon(dto) {
        const now = new Date();
        const discount = await this.discountModel
            .findOne({
            code: dto.code.toUpperCase(),
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
        })
            .exec();
        if (!discount) {
            return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon code' };
        }
        if (discount.usageLimit > 0 && discount.usageCount >= discount.usageLimit) {
            return { valid: false, discountAmount: 0, message: 'Coupon usage limit reached' };
        }
        if (dto.orderAmount < discount.minOrderAmount) {
            return {
                valid: false,
                discountAmount: 0,
                message: `Minimum order amount is ৳${discount.minOrderAmount}`,
            };
        }
        let discountAmount = 0;
        if (discount.discountType === 'percentage') {
            discountAmount = (dto.orderAmount * discount.discountValue) / 100;
            if (discount.maxDiscountAmount) {
                discountAmount = Math.min(discountAmount, discount.maxDiscountAmount);
            }
        }
        else {
            discountAmount = Math.min(discount.discountValue, dto.orderAmount);
        }
        if (discount.applicableTo === 'category') {
            if (dto.productIds?.length && discount.categories?.length) {
                const products = await this.productModel
                    .find({ _id: { $in: dto.productIds } })
                    .select('category')
                    .exec();
                const hasMatchingCategory = products.some((p) => discount.categories.some((dc) => dc.toString() === p.category?.toString()));
                if (!hasMatchingCategory) {
                    return { valid: false, discountAmount: 0, message: 'Coupon does not apply to products in this category' };
                }
            }
        }
        if (discount.applicableTo === 'specific_products') {
            if (dto.productIds?.length && discount.products?.length) {
                const hasOverlap = dto.productIds.some((pid) => discount.products.some((dp) => dp.toString() === pid));
                if (!hasOverlap) {
                    return { valid: false, discountAmount: 0, message: 'Coupon does not apply to these products' };
                }
            }
        }
        discount.usageCount += 1;
        await discount.save();
        return {
            valid: true,
            discountAmount: Math.round(discountAmount),
            message: `Coupon applied! You saved ৳${Math.round(discountAmount)}`,
        };
    }
};
exports.DiscountService = DiscountService;
exports.DiscountService = DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discount_schema_1.Discount.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DiscountService);
//# sourceMappingURL=discount.service.js.map