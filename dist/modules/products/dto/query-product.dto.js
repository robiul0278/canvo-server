"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProductDto = void 0;
const zod_1 = require("zod");
exports.QueryProductDto = zod_1.z.object({
    category: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    minPrice: zod_1.z.coerce.number().optional(),
    maxPrice: zod_1.z.coerce.number().optional(),
    tag: zod_1.z.string().optional(),
    sort: zod_1.z
        .enum(['newest', 'price_asc', 'price_desc', 'popular', 'rating'])
        .optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(12),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=query-product.dto.js.map