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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const frontend_content_service_1 = require("./frontend-content.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FrontendContentController = class FrontendContentController {
    contentService;
    constructor(contentService) {
        this.contentService = contentService;
    }
    async findAllActive() {
        return this.contentService.findAllActive();
    }
    async findBySection(section) {
        return this.contentService.findBySection(section);
    }
    async upsert(section, data, user) {
        return this.contentService.upsert(section, data, user.id);
    }
    async uploadHeroImage(file) {
        return this.contentService.uploadImage(file, 'hero');
    }
    async uploadBannerImage(file) {
        return this.contentService.uploadImage(file, 'banner');
    }
};
exports.FrontendContentController = FrontendContentController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active frontend sections (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FrontendContentController.prototype, "findAllActive", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':section'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single section content (public)' }),
    __param(0, (0, common_1.Param)('section')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FrontendContentController.prototype, "findBySection", null);
__decorate([
    (0, common_1.Put)(':section'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Upsert section content (Admin)' }),
    __param(0, (0, common_1.Param)('section')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FrontendContentController.prototype, "upsert", null);
__decorate([
    (0, common_1.Post)('hero/image'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Upload hero image (Admin)' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FrontendContentController.prototype, "uploadHeroImage", null);
__decorate([
    (0, common_1.Post)('banner/image'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Upload promo banner image (Admin)' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FrontendContentController.prototype, "uploadBannerImage", null);
exports.FrontendContentController = FrontendContentController = __decorate([
    (0, swagger_1.ApiTags)('Frontend Content'),
    (0, common_1.Controller)('frontend-content'),
    __metadata("design:paramtypes", [frontend_content_service_1.FrontendContentService])
], FrontendContentController);
//# sourceMappingURL=frontend-content.controller.js.map