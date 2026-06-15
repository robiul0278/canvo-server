"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('sslcommerz', () => ({
    storeId: process.env.SSLCOMMERZ_STORE_ID || '',
    storePass: process.env.SSLCOMMERZ_STORE_PASS || '',
    isLive: process.env.SSLCOMMERZ_IS_LIVE === 'true',
    sandboxUrl: 'https://sandbox.sslcommerz.com',
    liveUrl: 'https://secure.sslcommerz.com',
}));
//# sourceMappingURL=sslcommerz.config.js.map