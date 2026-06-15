"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiscountDto = void 0;
const zod_1 = require("zod");
exports.CreateDiscountDto = zod_1.z.object({
    type: zod_1.z.enum(['coupon_code', 'product_discount', 'flash_sale', 'bundle']),
    code: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    discountType: zod_1.z.enum(['percentage', 'flat_amount']),
    discountValue: zod_1.z.number().min(1),
    minOrderAmount: zod_1.z.number().min(0).optional(),
    maxDiscountAmount: zod_1.z.number().optional(),
    applicableTo: zod_1.z.enum(['all', 'category', 'specific_products']).optional(),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    products: zod_1.z.array(zod_1.z.string()).optional(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    usageLimit: zod_1.z.number().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=create-discount.dto.js.map