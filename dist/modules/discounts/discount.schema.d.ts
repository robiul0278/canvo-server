import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type DiscountDocument = Discount & Document;
export declare class Discount {
    type: string;
    code: string;
    title: string;
    description: string;
    discountType: string;
    discountValue: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
    applicableTo: string;
    categories: Types.ObjectId[];
    products: Types.ObjectId[];
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    usageCount: number;
    isActive: boolean;
    createdBy: Types.ObjectId;
}
export declare const DiscountSchema: MongooseSchema<Discount, import("mongoose").Model<Discount, any, any, any, any, any, Discount>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, Document<unknown, {}, Discount, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    type?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountType?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountValue?: import("mongoose").SchemaDefinitionProperty<number, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    minOrderAmount?: import("mongoose").SchemaDefinitionProperty<number, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    maxDiscountAmount?: import("mongoose").SchemaDefinitionProperty<number, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    applicableTo?: import("mongoose").SchemaDefinitionProperty<string, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    categories?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    products?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usageLimit?: import("mongoose").SchemaDefinitionProperty<number, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usageCount?: import("mongoose").SchemaDefinitionProperty<number, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Discount, Document<unknown, {}, Discount, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Discount & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Discount>;
