"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('nextauth', () => ({
    secret: process.env.NEXTAUTH_SECRET || '',
}));
//# sourceMappingURL=nextauth.config.js.map