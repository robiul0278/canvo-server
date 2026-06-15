"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendContentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const frontend_content_schema_1 = require("./frontend-content.schema");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
let FrontendContentService = class FrontendContentService {
    contentModel;
    constructor(contentModel) {
        this.contentModel = contentModel;
    }
    async findAllActive() {
        return this.contentModel
            .find({ isActive: true })
            .select('-__v')
            .exec();
    }
    async findBySection(section) {
        const content = await this.contentModel
            .findOne({ section, isActive: true })
            .exec();
        if (!content) {
            throw new common_1.NotFoundException(`Content section '${section}' not found`);
        }
        return content;
    }
    async upsert(section, data, userId) {
        return this.contentModel
            .findOneAndUpdate({ section }, {
            section,
            data,
            updatedBy: userId,
            isActive: true,
        }, { upsert: true, new: true })
            .exec();
    }
    async uploadImage(file, type) {
        const uploadDir = path_1.default.join(process.env.UPLOAD_PATH || './uploads', 'frontend', type);
        await promises_1.default.mkdir(uploadDir, { recursive: true });
        const filename = `${type}_${Date.now()}.webp`;
        const outputPath = path_1.default.join(uploadDir, filename);
        await (0, sharp_1.default)(file.buffer)
            .resize(1920, 1080, { fit: 'cover', position: 'centre' })
            .webp({ quality: 85 })
            .toFile(outputPath);
        const relativePath = `/uploads/frontend/${type}/${filename}`;
        return { success: true, data: { url: relativePath } };
    }
};
exports.FrontendContentService = FrontendContentService;
exports.FrontendContentService = FrontendContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(frontend_content_schema_1.FrontendContent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FrontendContentService);
//# sourceMappingURL=frontend-content.service.js.map