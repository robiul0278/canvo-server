"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryReviewDto = void 0;
const zod_1 = require("zod");
exports.QueryReviewDto = zod_1.z.object({
    isApproved: zod_1.z
        .enum(['true', 'false'])
        .transform((v) => v === 'true')
        .optional(),
    rating: zod_1.z.coerce.number().min(1).max(5).optional(),
    search: zod_1.z.string().optional(),
    sort: zod_1.z
        .enum(['newest', 'oldest', 'rating_asc', 'rating_desc'])
        .optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
});
//# sourceMappingURL=query-review.dto.js.map