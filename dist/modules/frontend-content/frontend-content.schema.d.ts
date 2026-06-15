import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type FrontendContentDocument = FrontendContent & Document;
export declare class FrontendContent {
    section: string;
    data: Record<string, any>;
    isActive: boolean;
    updatedBy: Types.ObjectId;
}
export declare const FrontendContentSchema: MongooseSchema<FrontendContent, import("mongoose").Model<FrontendContent, any, any, any, any, any, FrontendContent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FrontendContent, Document<unknown, {}, FrontendContent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<FrontendContent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    section?: import("mongoose").SchemaDefinitionProperty<string, FrontendContent, Document<unknown, {}, FrontendContent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FrontendContent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    data?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, FrontendContent, Document<unknown, {}, FrontendContent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FrontendContent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, FrontendContent, Document<unknown, {}, FrontendContent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FrontendContent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, FrontendContent, Document<unknown, {}, FrontendContent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FrontendContent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, FrontendContent>;
