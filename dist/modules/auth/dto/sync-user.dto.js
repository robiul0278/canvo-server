"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncUserDto = void 0;
const zod_1 = require("zod");
exports.SyncUserDto = zod_1.z.object({
    googleId: zod_1.z.string().min(1, 'Google ID is required'),
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email'),
    avatar: zod_1.z.string().optional(),
});
//# sourceMappingURL=sync-user.dto.js.map