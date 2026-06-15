"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusDto = void 0;
const zod_1 = require("zod");
exports.UpdateStatusDto = zod_1.z.object({
    status: zod_1.z.enum([
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'returned',
    ]),
    note: zod_1.z.string().optional(),
});
//# sourceMappingURL=update-status.dto.js.map