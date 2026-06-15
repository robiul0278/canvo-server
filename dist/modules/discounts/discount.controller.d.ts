import { DiscountService } from './discount.service';
import type { CreateDiscountDtoType } from './dto/create-discount.dto';
import type { ValidateCouponDtoType } from './dto/validate-coupon.dto';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    create(body: CreateDiscountDtoType, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./discount.schema").DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./discount.schema").Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./discount.schema").DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./discount.schema").Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, body: Partial<CreateDiscountDtoType>): Promise<import("mongoose").Document<unknown, {}, import("./discount.schema").DiscountDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./discount.schema").Discount & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    validateCoupon(body: ValidateCouponDtoType): Promise<{
        valid: boolean;
        discountAmount: number;
        message: string;
    }>;
}
