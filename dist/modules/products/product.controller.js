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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const product_service_1 = require("./product.service");
const image_processor_service_1 = require("./image-processor.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const query_product_dto_1 = require("./dto/query-product.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../../common/pipes/zod-validation.pipe");
let ProductController = class ProductController {
    productService;
    imageProcessor;
    constructor(productService, imageProcessor) {
        this.productService = productService;
        this.imageProcessor = imageProcessor;
    }
    async findAll(query) {
        return this.productService.findAll(query);
    }
    async findFeatured() {
        return this.productService.findFeatured();
    }
    async findNewArrivals() {
        return this.productService.findNewArrivals();
    }
    async findBySlug(slug) {
        return this.productService.findBySlug(slug);
    }
    async create(body, user) {
        return this.productService.create(body, user.id);
    }
    async update(id, body) {
        return this.productService.update(id, body);
    }
    async remove(id) {
        return this.productService.remove(id);
    }
    async uploadImages(id, colorSlug, files) {
        const results = await Promise.all(files.map((f) => this.imageProcessor.processProductImage(f, id, colorSlug || 'default')));
        return results;
    }
    async removeImage(id, imgId) {
        return this.productService.removeImage(id, imgId);
    }
    async reorderImages(id, body) {
        return this.productService.reorderImages(id, body.variationIndex, body.imageIds);
    }
    async findDashboardAll() {
        return this.productService.findDashboardAll();
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products (public, paginated)' }),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(query_product_dto_1.QueryProductDto))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findFeatured", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('new-arrivals'),
    (0, swagger_1.ApiOperation)({ summary: 'Get new arrival products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findNewArrivals", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single product by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create product (Admin/Moderator)' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(create_product_dto_1.CreateProductDto))),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update product (Admin/Moderator)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product (Admin/Moderator)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 8)),
    (0, swagger_1.ApiOperation)({ summary: 'Upload product images (Admin/Moderator)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('colorSlug')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Delete)(':id/images/:imgId'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete individual image from product variation' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('imgId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeImage", null);
__decorate([
    (0, common_1.Patch)(':id/images/reorder'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder images in a product variation' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "reorderImages", null);
__decorate([
    (0, common_1.Get)('dashboard/all'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products for dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findDashboardAll", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        image_processor_service_1.ImageProcessorService])
], ProductController);
//# sourceMappingURL=product.controller.js.map