"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCouponDto = void 0;
const zod_1 = require("zod");
exports.ValidateCouponDto = zod_1.z.object({
    code: zod_1.z.string().min(1),
    orderAmount: zod_1.z.number().min(0),
    productIds: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=validate-coupon.dto.js.map