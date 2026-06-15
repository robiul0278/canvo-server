import { Model } from 'mongoose';
import { Discount, DiscountDocument } from './discount.schema';
import { CreateDiscountDtoType } from './dto/create-discount.dto';
import { ValidateCouponDtoType } from './dto/validate-coupon.dto';
export declare class DiscountService {
    private discountModel;
    private productModel;
    constructor(discountModel: Model<DiscountDocument>, productModel: Model<any>);
    create(dto: CreateDiscountDtoType, userId: string): Promise<import("mongoose").Document<unknown, {}, DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, dto: Partial<CreateDiscountDtoType>): Promise<import("mongoose").Document<unknown, {}, DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    validateCoupon(dto: ValidateCouponDtoType): Promise<{
        valid: boolean;
        discountAmount: number;
        message: string;
    }>;
}
