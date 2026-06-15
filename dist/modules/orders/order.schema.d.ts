import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class OrderItemVariation {
    color: string;
    colorHex: string;
    size: string;
    imageUrl: string;
}
export declare const OrderItemVariationSchema: MongooseSchema<OrderItemVariation, import("mongoose").Model<OrderItemVariation, any, any, any, any, any, OrderItemVariation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItemVariation, Document<unknown, {}, OrderItemVariation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<OrderItemVariation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    color?: import("mongoose").SchemaDefinitionProperty<string, OrderItemVariation, Document<unknown, {}, OrderItemVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItemVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    colorHex?: import("mongoose").SchemaDefinitionProperty<string, OrderItemVariation, Document<unknown, {}, OrderItemVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItemVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    size?: import("mongoose").SchemaDefinitionProperty<string, OrderItemVariation, Document<unknown, {}, OrderItemVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItemVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, OrderItemVariation, Document<unknown, {}, OrderItemVariation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItemVariation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderItemVariation>;
export declare class OrderItem {
    product: Types.ObjectId;
    productName: string;
    productSlug: string;
    variation: OrderItemVariation;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export declare const OrderItemSchema: MongooseSchema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, any, any, OrderItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, OrderItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    product?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    productName?: import("mongoose").SchemaDefinitionProperty<string, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    productSlug?: import("mongoose").SchemaDefinitionProperty<string, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    variation?: import("mongoose").SchemaDefinitionProperty<OrderItemVariation, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    unitPrice?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalPrice?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderItem>;
export declare class DeliveryAddress {
    name: string;
    phone: string;
    district: string;
    thana: string;
    address: string;
}
export declare const DeliveryAddressSchema: MongooseSchema<DeliveryAddress, import("mongoose").Model<DeliveryAddress, any, any, any, any, any, DeliveryAddress>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    district?: import("mongoose").SchemaDefinitionProperty<string, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    thana?: import("mongoose").SchemaDefinitionProperty<string, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, DeliveryAddress, Document<unknown, {}, DeliveryAddress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeliveryAddress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, DeliveryAddress>;
export declare class StatusHistoryEntry {
    status: string;
    note: string;
    updatedBy: Types.ObjectId;
    updatedAt: Date;
}
export declare const StatusHistoryEntrySchema: MongooseSchema<StatusHistoryEntry, import("mongoose").Model<StatusHistoryEntry, any, any, any, any, any, StatusHistoryEntry>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StatusHistoryEntry, Document<unknown, {}, StatusHistoryEntry, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<StatusHistoryEntry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    status?: import("mongoose").SchemaDefinitionProperty<string, StatusHistoryEntry, Document<unknown, {}, StatusHistoryEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatusHistoryEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    note?: import("mongoose").SchemaDefinitionProperty<string, StatusHistoryEntry, Document<unknown, {}, StatusHistoryEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatusHistoryEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, StatusHistoryEntry, Document<unknown, {}, StatusHistoryEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatusHistoryEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, StatusHistoryEntry, Document<unknown, {}, StatusHistoryEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatusHistoryEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, StatusHistoryEntry>;
export declare class Order {
    orderNumber: string;
    user: Types.ObjectId;
    guestInfo: {
        name: string;
        email: string;
        phone: string;
    };
    items: OrderItem[];
    subtotal: number;
    discountCode: string;
    discountAmount: number;
    deliveryCharge: number;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    deliveryAddress: DeliveryAddress;
    trackingNumber: string;
    notes: string;
    sslczTransactionId: string;
    statusHistory: StatusHistoryEntry[];
}
export declare const OrderSchema: MongooseSchema<Order, import("mongoose").Model<Order, any, any, any, any, any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    orderNumber?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    guestInfo?: import("mongoose").SchemaDefinitionProperty<{
        name: string;
        email: string;
        phone: string;
    }, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<OrderItem[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtotal?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountCode?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountAmount?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryCharge?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalAmount?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentMethod?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentStatus?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    orderStatus?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryAddress?: import("mongoose").SchemaDefinitionProperty<DeliveryAddress, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    trackingNumber?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sslczTransactionId?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    statusHistory?: import("mongoose").SchemaDefinitionProperty<StatusHistoryEntry[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Order>;
