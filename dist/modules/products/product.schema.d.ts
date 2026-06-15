import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type ProductDocument = Product & Document;
export declare class ProductImage {
    url: string;
    thumbnailUrl: string;
    order: number;
    isDefault: boolean;
}
export declare const ProductImageSchema: MongooseSchema<ProductImage, import("mongoose").Model<ProductImage, any, any, any, any, any, ProductImage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductImage, Document<unknown, {}, ProductImage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ProductImage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    url?: import("mongoose").SchemaDefinitionProperty<string, ProductImage, Document<unknown, {}, ProductImage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductImage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    thumbnailUrl?: import("mongoose").SchemaDefinitionProperty<string, ProductImage, Document<unknown, {}, ProductImage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductImage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    order?: import("mongoose").SchemaDefinitionProperty<number, ProductImage, Document<unknown, {}, ProductImage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductImage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDefault?: import("mongoose").SchemaDefinitionProperty<boolean, ProductImage, Document<unknown, {}, ProductImage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductImage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductImage>;
export declare class ProductSize {
    size: string;
    stock: number;
    priceOverride: number;
}
export declare const ProductSizeSchema: MongooseSchema<ProductSize, import("mongoose").Model<ProductSize, any, any, any, any, any, ProductSize>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductSize, Document<unknown, {}, ProductSize, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ProductSize & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    size?: import("mongoose").SchemaDefinitionProperty<string, ProductSize, Document<unknown, {}, ProductSize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stock?: import("mongoose").SchemaDefinitionProperty<number, ProductSize, Document<unknown, {}, ProductSize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priceOverride?: import("mongoose").SchemaDefinitionProperty<number, ProductSize, Document<unknown, {}, ProductSize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductSize>;
export declare class ProductVariation {
    color: string;
    colorHex: string;
    images: ProductImage[];
    sizes: ProductSize[];
}
export declare const ProductVariationSchema: MongooseSchema<ProductVariation, import("mongoose").Model<ProductVariation, any, any, any, any, any, ProductVariation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductVariation, Document<unknown, {}, ProductVariation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ProductVariation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    color?: import("mongoose").SchemaDefinitionProperty<string, ProductVariation, Document<unknown, {}, ProductVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    colorHex?: import("mongoose").SchemaDefinitionProperty<string, ProductVariation, Document<unknown, {}, ProductVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    images?: import("mongoose").SchemaDefinitionProperty<ProductImage[], ProductVariation, Document<unknown, {}, ProductVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sizes?: import("mongoose").SchemaDefinitionProperty<ProductSize[], ProductVariation, Document<unknown, {}, ProductVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductVariation>;
export declare class Product {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    category: Types.ObjectId;
    tags: string[];
    basePrice: number;
    discountType: string;
    discountValue: number;
    variations: ProductVariation[];
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestseller: boolean;
    isPublished: boolean;
    publishedAt: Date;
    metaTitle: string;
    metaDescription: string;
    ratings: {
        average: number;
        count: number;
    };
    createdBy: Types.ObjectId;
    virtuals: {
        finalPrice: number;
        totalStock: number;
    };
}
export declare const ProductSchema: MongooseSchema<Product, import("mongoose").Model<Product, any, any, any, any, any, Product>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, Product, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shortDescription?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    basePrice?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountType?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountValue?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    variations?: import("mongoose").SchemaDefinitionProperty<ProductVariation[], Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isFeatured?: import("mongoose").SchemaDefinitionProperty<boolean, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isNewArrival?: import("mongoose").SchemaDefinitionProperty<boolean, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isBestseller?: import("mongoose").SchemaDefinitionProperty<boolean, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    publishedAt?: import("mongoose").SchemaDefinitionProperty<Date, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    metaTitle?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    metaDescription?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ratings?: import("mongoose").SchemaDefinitionProperty<{
        average: number;
        count: number;
    }, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    virtuals?: import("mongoose").SchemaDefinitionProperty<{
        finalPrice: number;
        totalStock: number;
    }, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Product>;
