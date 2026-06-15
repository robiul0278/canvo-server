import { FrontendContentService } from './frontend-content.service';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class FrontendContentController {
    private readonly contentService;
    constructor(contentService: FrontendContentService);
    findAllActive(): Promise<(import("mongoose").Document<unknown, {}, import("./frontend-content.schema").FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./frontend-content.schema").FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySection(section: string): Promise<import("mongoose").Document<unknown, {}, import("./frontend-content.schema").FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./frontend-content.schema").FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    upsert(section: string, data: Record<string, any>, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./frontend-content.schema").FrontendContentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./frontend-content.schema").FrontendContent & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    uploadHeroImage(file: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            url: string;
        };
    }>;
    uploadBannerImage(file: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            url: string;
        };
    }>;
}
