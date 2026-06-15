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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
const image_processor_service_1 = require("./image-processor.service");
const query_helper_1 = require("../../common/helpers/query.helper");
const category_schema_1 = require("../categories/category.schema");
let ProductService = class ProductService {
    productModel;
    categoryModel;
    imageProcessor;
    constructor(productModel, categoryModel, imageProcessor) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.imageProcessor = imageProcessor;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 100);
    }
    async create(dto, userId) {
        const slug = dto.slug ||
            this.generateSlug(dto.name) + '-' + Date.now().toString(36);
        const existing = await this.productModel.findOne({ slug });
        if (existing) {
            throw new common_1.BadRequestException('Product with this slug already exists');
        }
        const product = new this.productModel({
            ...dto,
            slug,
            category: dto.category,
            createdBy: userId,
            publishedAt: dto.isPublished ? new Date() : undefined,
        });
        return product.save();
    }
    async findAll(query) {
        let categoryId = query.category;
        if (categoryId && !categoryId.match(/^[0-9a-fA-F]{24}$/)) {
            const cat = await this.categoryModel.findOne({ slug: categoryId }).select('_id').exec();
            if (cat)
                categoryId = cat._id.toString();
        }
        const filter = query_helper_1.QueryHelper.combine(query_helper_1.QueryHelper.buildTextSearch(['name', 'description'], query.search), query_helper_1.QueryHelper.buildMatchFilter('category', categoryId), query_helper_1.QueryHelper.buildMatchFilter('tags', query.tag), query_helper_1.QueryHelper.buildMatchFilter('variations.color', query.color), query_helper_1.QueryHelper.buildMatchFilter('variations.sizes.size', query.size), query_helper_1.QueryHelper.buildRangeFilter('basePrice', query.minPrice, query.maxPrice));
        return query_helper_1.QueryHelper.paginate(this.productModel, filter, {
            page: query.page,
            limit: query.limit,
            sort: query_helper_1.QueryHelper.buildSort(query.sort),
            populate: { path: 'category', select: 'name slug' },
        });
    }
    async findFeatured() {
        return this.productModel
            .find({ isFeatured: true, isPublished: true })
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .limit(8)
            .exec();
    }
    async findNewArrivals() {
        return this.productModel
            .find({ isNewArrival: true, isPublished: true })
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .limit(8)
            .exec();
    }
    async findBySlug(slug) {
        const product = await this.productModel
            .findOne({ slug, isPublished: true })
            .populate('category', 'name slug')
            .exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async findById(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto) {
        const updateData = { ...dto };
        if (dto.isPublished && !dto.isPublished === undefined) {
            updateData.publishedAt = new Date();
        }
        const product = await this.productModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async remove(id) {
        const product = await this.productModel.findByIdAndDelete(id).exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return { deleted: true };
    }
    async removeImage(productId, imageId) {
        const product = await this.productModel.findById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let foundImage = null;
        for (const variation of product.variations) {
            const imgIdx = variation.images.findIndex((img) => img._id.toString() === imageId);
            if (imgIdx !== -1) {
                foundImage = variation.images[imgIdx];
                variation.images.splice(imgIdx, 1);
                break;
            }
        }
        if (!foundImage) {
            throw new common_1.NotFoundException('Image not found');
        }
        if (foundImage.url) {
            await this.imageProcessor.deleteProductImage(foundImage.url);
        }
        await product.save();
        return { success: true, message: 'Image deleted' };
    }
    async reorderImages(productId, variationIndex, imageIds) {
        const product = await this.productModel.findById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const variation = product.variations[variationIndex];
        if (!variation) {
            throw new common_1.NotFoundException('Variation not found');
        }
        const reordered = [];
        for (const id of imageIds) {
            const img = variation.images.find((i) => i._id.toString() === id);
            if (img) {
                reordered.push(img);
            }
        }
        const remaining = variation.images.filter((i) => !imageIds.includes(i._id.toString()));
        variation.images = [...reordered, ...remaining];
        variation.images.forEach((img, idx) => {
            img.order = idx;
        });
        await product.save();
        return { success: true, message: 'Images reordered' };
    }
    async findDashboardAll() {
        return this.productModel
            .find()
            .populate('category', 'name slug')
            .sort({ updatedAt: -1 })
            .exec();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        image_processor_service_1.ImageProcessorService])
], ProductService);
//# sourceMappingURL=product.service.js.map