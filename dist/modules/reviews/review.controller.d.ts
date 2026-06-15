import { ReviewService } from './review.service';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import type { QueryReviewDtoType } from './dto/query-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(user: NextAuthUser, body: {
        product: string;
        rating: number;
        title?: string;
        comment?: string;
        images?: string[];
    }): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByProduct(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(query: QueryReviewDtoType): Promise<import("../../common/helpers/query.helper").PaginatedResult<unknown>>;
    approve(id: string): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    reply(id: string, adminReply: string): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
