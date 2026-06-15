import { ProductService } from './product.service';
import { ImageProcessorService } from './image-processor.service';
import type { CreateProductDtoType } from './dto/create-product.dto';
import type { QueryProductDtoType } from './dto/query-product.dto';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class ProductController {
    private readonly productService;
    private readonly imageProcessor;
    constructor(productService: ProductService, imageProcessor: ImageProcessorService);
    findAll(query: QueryProductDtoType): Promise<import("../../common/helpers/query.helper").PaginatedResult<unknown>>;
    findFeatured(): Promise<(import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findNewArrivals(): Promise<(import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(body: CreateProductDtoType, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, body: Partial<CreateProductDtoType>): Promise<import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    uploadImages(id: string, colorSlug: string, files: Express.Multer.File[]): Promise<{
        url: string;
        thumbnailUrl: string;
    }[]>;
    removeImage(id: string, imgId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    reorderImages(id: string, body: {
        variationIndex: number;
        imageIds: string[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    findDashboardAll(): Promise<(import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
