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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./review.schema");
const product_schema_1 = require("../products/product.schema");
const order_schema_1 = require("../orders/order.schema");
const query_helper_1 = require("../../common/helpers/query.helper");
let ReviewService = class ReviewService {
    reviewModel;
    productModel;
    orderModel;
    constructor(reviewModel, productModel, orderModel) {
        this.reviewModel = reviewModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    async create(dto, userId) {
        const existing = await this.reviewModel
            .findOne({ user: userId, product: dto.product })
            .exec();
        if (existing) {
            throw new common_1.BadRequestException('You have already reviewed this product');
        }
        const verifiedOrder = await this.orderModel
            .findOne({
            user: userId,
            'items.product': dto.product,
            orderStatus: { $in: ['delivered', 'shipped'] },
        })
            .exec();
        const review = new this.reviewModel({
            ...dto,
            user: userId,
            isVerifiedPurchase: !!verifiedOrder,
        });
        return review.save();
    }
    async findByProduct(productId) {
        return this.reviewModel
            .find({ product: productId, isApproved: true })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findAll(query) {
        const filter = query_helper_1.QueryHelper.combine(query.isApproved !== undefined
            ? query_helper_1.QueryHelper.buildMatchFilter('isApproved', query.isApproved)
            : undefined, query_helper_1.QueryHelper.buildMatchFilter('rating', query.rating), query_helper_1.QueryHelper.buildTextSearch(['title', 'comment'], query.search));
        return query_helper_1.QueryHelper.paginate(this.reviewModel, filter, {
            page: query.page,
            limit: query.limit,
            sort: query_helper_1.QueryHelper.buildSort(query.sort, { createdAt: -1 }),
            populate: [
                { path: 'user', select: 'name email' },
                { path: 'product', select: 'name slug' },
            ],
        });
    }
    async approve(id) {
        const review = await this.reviewModel.findById(id);
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        review.isApproved = true;
        await review.save();
        await this.updateProductRatings(review.product.toString());
        return review;
    }
    async reply(id, adminReply) {
        const review = await this.reviewModel.findByIdAndUpdate(id, { adminReply }, { new: true });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return review;
    }
    async remove(id) {
        const review = await this.reviewModel.findByIdAndDelete(id);
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        await this.updateProductRatings(review.product.toString());
        return { deleted: true };
    }
    async updateProductRatings(productId) {
        const result = await this.reviewModel
            .aggregate([
            { $match: { product: productId, isApproved: true } },
            {
                $group: {
                    _id: '$product',
                    average: { $avg: '$rating' },
                    count: { $sum: 1 },
                },
            },
        ])
            .exec();
        if (result.length > 0) {
            await this.productModel
                .findByIdAndUpdate(productId, {
                ratings: {
                    average: Math.round(result[0].average * 10) / 10,
                    count: result[0].count,
                },
            })
                .exec();
        }
        else {
            await this.productModel
                .findByIdAndUpdate(productId, {
                ratings: { average: 0, count: 0 },
            })
                .exec();
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=review.service.js.map