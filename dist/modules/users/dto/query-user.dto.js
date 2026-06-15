"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUserDto = void 0;
const zod_1 = require("zod");
exports.QueryUserDto = zod_1.z.object({
    search: zod_1.z.string().optional(),
    role: zod_1.z.enum(['admin', 'moderator', 'user']).optional(),
    isActive: zod_1.z
        .enum(['true', 'false'])
        .transform((v) => v === 'true')
        .optional(),
    sort: zod_1.z.enum(['newest', 'oldest', 'name_asc', 'name_desc']).optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
});
//# sourceMappingURL=query-user.dto.js.map