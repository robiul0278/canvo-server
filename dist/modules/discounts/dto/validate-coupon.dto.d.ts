import { z } from 'zod';
export declare const ValidateCouponDto: z.ZodObject<{
    code: z.ZodString;
    orderAmount: z.ZodNumber;
    productIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type ValidateCouponDtoType = z.infer<typeof ValidateCouponDto>;
