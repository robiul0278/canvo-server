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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./category.schema");
const product_schema_1 = require("../products/product.schema");
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
let CategoryService = class CategoryService {
    categoryModel;
    productModel;
    configService;
    constructor(categoryModel, productModel, configService) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('cloudinary.cloudName'),
            api_key: this.configService.get('cloudinary.apiKey'),
            api_secret: this.configService.get('cloudinary.apiSecret'),
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 80);
    }
    async findAll() {
        return this.categoryModel
            .find({ isVisible: true })
            .sort({ order: 1, name: 1 })
            .populate('productCount')
            .exec();
    }
    async findAllAdmin() {
        return this.categoryModel
            .find()
            .sort({ order: 1, name: 1 })
            .populate('productCount')
            .exec();
    }
    async findBySlug(slug) {
        const category = await this.categoryModel
            .findOne({ slug })
            .populate('productCount')
            .exec();
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async create(dto) {
        const count = await this.categoryModel.countDocuments();
        if (count >= 12) {
            throw new common_1.BadRequestException('Maximum 12 categories allowed');
        }
        const slug = this.generateSlug(dto.name);
        const existing = await this.categoryModel.findOne({ slug });
        if (existing) {
            throw new common_1.BadRequestException('Category with this name already exists');
        }
        const category = await this.categoryModel.create({ ...dto, slug });
        return this.categoryModel.findById(category._id).populate('productCount').exec();
    }
    async update(id, dto) {
        const updateData = { ...dto };
        if (dto.name) {
            updateData.slug = this.generateSlug(dto.name);
        }
        const category = await this.categoryModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('productCount')
            .exec();
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async remove(id) {
        const productCount = await this.productModel.countDocuments({ category: id });
        if (productCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete category with ${productCount} product(s). Edit or reassign them first.`);
        }
        const category = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return { deleted: true };
    }
    async reorder(items) {
        const ops = items.map((item) => ({
            updateOne: {
                filter: { _id: item.id },
                update: { $set: { order: item.order } },
            },
        }));
        await this.categoryModel.bulkWrite(ops);
        return { success: true };
    }
    async uploadImage(id, file) {
        const category = await this.categoryModel.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'canvo/categories',
                resource_type: 'image',
            }, (error, result) => {
                if (error)
                    reject(new common_1.BadRequestException(error.message));
                else
                    resolve(result);
            });
            stream.end(file.buffer);
        });
        category.image = result.secure_url;
        await category.save();
        return this.categoryModel.findById(category._id).populate('productCount').exec();
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], CategoryService);
//# sourceMappingURL=category.service.js.map