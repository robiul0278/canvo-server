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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = exports.ProductVariationSchema = exports.ProductVariation = exports.ProductSizeSchema = exports.ProductSize = exports.ProductImageSchema = exports.ProductImage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductImage = class ProductImage {
    url;
    thumbnailUrl;
    order;
    isDefault;
};
exports.ProductImage = ProductImage;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductImage.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductImage.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductImage.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductImage.prototype, "isDefault", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ProductImage);
exports.ProductImageSchema = mongoose_1.SchemaFactory.createForClass(ProductImage);
let ProductSize = class ProductSize {
    size;
    stock;
    priceOverride;
};
exports.ProductSize = ProductSize;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductSize.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductSize.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ProductSize.prototype, "priceOverride", void 0);
exports.ProductSize = ProductSize = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ProductSize);
exports.ProductSizeSchema = mongoose_1.SchemaFactory.createForClass(ProductSize);
let ProductVariation = class ProductVariation {
    color;
    colorHex;
    images;
    sizes;
};
exports.ProductVariation = ProductVariation;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductVariation.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductVariation.prototype, "colorHex", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ProductImageSchema], default: [] }),
    __metadata("design:type", Array)
], ProductVariation.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ProductSizeSchema], default: [] }),
    __metadata("design:type", Array)
], ProductVariation.prototype, "sizes", void 0);
exports.ProductVariation = ProductVariation = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ProductVariation);
exports.ProductVariationSchema = mongoose_1.SchemaFactory.createForClass(ProductVariation);
let Product = class Product {
    name;
    slug;
    description;
    shortDescription;
    category;
    tags;
    basePrice;
    discountType;
    discountValue;
    variations;
    isFeatured;
    isNewArrival;
    isBestseller;
    isPublished;
    publishedAt;
    metaTitle;
    metaDescription;
    ratings;
    createdBy;
    virtuals;
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "basePrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['none', 'percentage', 'flat'], default: 'none' }),
    __metadata("design:type", String)
], Product.prototype, "discountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discountValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ProductVariationSchema], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "variations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isNewArrival", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isBestseller", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Product.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "metaTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "metaDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
        default: { average: 0, count: 0 },
    }),
    __metadata("design:type", Object)
], Product.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "createdBy", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.virtual('finalPrice').get(function () {
    if (this.discountType === 'percentage') {
        return this.basePrice - (this.basePrice * this.discountValue) / 100;
    }
    if (this.discountType === 'flat') {
        return Math.max(0, this.basePrice - this.discountValue);
    }
    return this.basePrice;
});
exports.ProductSchema.virtual('totalStock').get(function () {
    return this.variations.reduce((total, v) => {
        return total + v.sizes.reduce((sTotal, s) => sTotal + s.stock, 0);
    }, 0);
});
exports.ProductSchema.set('toJSON', { virtuals: true });
exports.ProductSchema.set('toObject', { virtuals: true });
//# sourceMappingURL=product.schema.js.map