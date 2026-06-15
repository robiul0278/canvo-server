import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAllAdmin(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(body: {
        name: string;
        image?: string;
        icon?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    reorder(body: {
        id: string;
        order: number;
    }[]): Promise<{
        success: boolean;
    }>;
    update(id: string, body: Partial<{
        name: string;
        image: string;
        icon: string;
        order: number;
        isVisible: boolean;
    }>): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    uploadImage(id: string, file: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./category.schema").Category & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
