"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const zod_1 = require("zod");
const ProductImageDto = zod_1.z.object({
    url: zod_1.z.string().optional(),
    thumbnailUrl: zod_1.z.string().optional(),
    order: zod_1.z.number().optional(),
    isDefault: zod_1.z.boolean().optional(),
});
const ProductSizeDto = zod_1.z.object({
    size: zod_1.z.string().min(1),
    stock: zod_1.z.number().min(0).optional(),
    priceOverride: zod_1.z.number().optional(),
});
const ProductVariationDto = zod_1.z.object({
    color: zod_1.z.string().min(1),
    colorHex: zod_1.z.string().min(1),
    images: zod_1.z.array(ProductImageDto).optional(),
    sizes: zod_1.z.array(ProductSizeDto).optional(),
});
exports.CreateProductDto = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product name is required'),
    slug: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    shortDescription: zod_1.z.string().optional(),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    basePrice: zod_1.z.number().min(0, 'Base price must be positive'),
    discountType: zod_1.z.enum(['none', 'percentage', 'flat']).optional(),
    discountValue: zod_1.z.number().min(0).optional(),
    variations: zod_1.z.array(ProductVariationDto).optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isNewArrival: zod_1.z.boolean().optional(),
    isBestseller: zod_1.z.boolean().optional(),
    isPublished: zod_1.z.boolean().optional(),
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-product.dto.js.map