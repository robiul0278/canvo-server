import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { ProductDocument } from '../products/product.schema';
import { OrderDocument } from '../orders/order.schema';
import { QueryReviewDtoType } from './dto/query-review.dto';
export declare class ReviewService {
    private reviewModel;
    private productModel;
    private orderModel;
    constructor(reviewModel: Model<ReviewDocument>, productModel: Model<ProductDocument>, orderModel: Model<OrderDocument>);
    create(dto: {
        product: string;
        rating: number;
        title?: string;
        comment?: string;
        images?: string[];
    }, userId: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByProduct(productId: string): Promise<(import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(query: QueryReviewDtoType): Promise<import("../../common/helpers/query.helper").PaginatedResult<unknown>>;
    approve(id: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    reply(id: string, adminReply: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    private updateProductRatings;
}
