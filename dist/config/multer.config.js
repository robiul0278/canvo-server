"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('multer', () => ({
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '102400', 10),
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 8,
}));
//# sourceMappingURL=multer.config.js.map