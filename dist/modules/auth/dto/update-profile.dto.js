"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileDto = exports.AddressDto = void 0;
const zod_1 = require("zod");
exports.AddressDto = zod_1.z.object({
    label: zod_1.z.string().min(1),
    district: zod_1.z.string().min(1),
    thana: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
    isDefault: zod_1.z.boolean().optional(),
});
exports.UpdateProfileDto = zod_1.z.object({
    phone: zod_1.z.string().optional(),
    addresses: zod_1.z.array(exports.AddressDto).optional(),
});
//# sourceMappingURL=update-profile.dto.js.map