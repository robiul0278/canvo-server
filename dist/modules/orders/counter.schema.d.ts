import { Document } from 'mongoose';
export type CounterDocument = Counter & Document;
export declare class Counter {
    key: string;
    seq: number;
    year: number;
}
export declare const CounterSchema: import("mongoose").Schema<Counter, import("mongoose").Model<Counter, any, any, any, any, any, Counter>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Counter, Document<unknown, {}, Counter, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Counter & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    key?: import("mongoose").SchemaDefinitionProperty<string, Counter, Document<unknown, {}, Counter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Counter & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    seq?: import("mongoose").SchemaDefinitionProperty<number, Counter, Document<unknown, {}, Counter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Counter & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    year?: import("mongoose").SchemaDefinitionProperty<number, Counter, Document<unknown, {}, Counter, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Counter & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Counter>;
