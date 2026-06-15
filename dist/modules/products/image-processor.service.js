"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessorService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
let ImageProcessorService = class ImageProcessorService {
    async processProductImage(file, productId, colorSlug) {
        const uploadDir = path_1.default.join(process.env.UPLOAD_PATH || './uploads', 'products', productId, colorSlug);
        await promises_1.default.mkdir(uploadDir, { recursive: true });
        const timestamp = Date.now();
        const filename = `${timestamp}.webp`;
        const thumbnailFilename = `${timestamp}_thumb.webp`;
        const outputPath = path_1.default.join(uploadDir, filename);
        const thumbnailPath = path_1.default.join(uploadDir, thumbnailFilename);
        await (0, sharp_1.default)(file.buffer)
            .resize(800, 1000, { fit: 'cover', position: 'centre' })
            .webp({ quality: 85 })
            .toFile(outputPath);
        await (0, sharp_1.default)(file.buffer)
            .resize(400, 500, { fit: 'cover', position: 'centre' })
            .webp({ quality: 70 })
            .toFile(thumbnailPath);
        const relativePath = (p) => p.replace(/\\/g, '/').replace(/^.*\/uploads\//, '/uploads/');
        return {
            url: relativePath(outputPath),
            thumbnailUrl: relativePath(thumbnailPath),
        };
    }
    async deleteProductImage(filePath) {
        const fullPath = path_1.default.join(process.env.UPLOAD_PATH || './uploads', filePath.replace('/uploads/', ''));
        try {
            await promises_1.default.unlink(fullPath);
            const thumbPath = fullPath.replace('.webp', '_thumb.webp');
            await promises_1.default.unlink(thumbPath).catch(() => { });
        }
        catch { }
    }
};
exports.ImageProcessorService = ImageProcessorService;
exports.ImageProcessorService = ImageProcessorService = __decorate([
    (0, common_1.Injectable)()
], ImageProcessorService);
//# sourceMappingURL=image-processor.service.js.map