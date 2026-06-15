"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOrderDto = void 0;
const zod_1 = require("zod");
exports.QueryOrderDto = zod_1.z.object({
    search: zod_1.z.string().optional(),
    orderStatus: zod_1.z
        .enum([
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'returned',
    ])
        .optional(),
    paymentStatus: zod_1.z
        .enum(['pending', 'paid', 'failed', 'refunded'])
        .optional(),
    paymentMethod: zod_1.z.enum(['sslcommerz', 'cod']).optional(),
    sort: zod_1.z
        .enum(['newest', 'oldest', 'updated'])
        .optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
});
//# sourceMappingURL=query-order.dto.js.map