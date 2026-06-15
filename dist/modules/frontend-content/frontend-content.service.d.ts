import { Model } from 'mongoose';
import { FrontendContent, FrontendContentDocument } from './frontend-content.schema';
export declare class FrontendContentService {
    private contentModel;
    constructor(contentModel: Model<FrontendContentDocument>);
    findAllActive(): Promise<(import("mongoose").Document<unknown, {}, FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySection(section: string): Promise<import("mongoose").Document<unknown, {}, FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    upsert(section: string, data: Record<string, any>, userId: string): Promise<import("mongoose").Document<unknown, {}, FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    uploadImage(file: Express.Multer.File, type: 'hero' | 'banner'): Promise<{
        success: boolean;
        data: {
            url: string;
        };
    }>;
}
