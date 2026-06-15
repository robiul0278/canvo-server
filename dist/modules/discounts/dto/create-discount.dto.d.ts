import { z } from 'zod';
export declare const CreateDiscountDto: z.ZodObject<{
    type: z.ZodEnum<{
        coupon_code: "coupon_code";
        product_discount: "product_discount";
        flash_sale: "flash_sale";
        bundle: "bundle";
    }>;
    code: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    discountType: z.ZodEnum<{
        percentage: "percentage";
        flat_amount: "flat_amount";
    }>;
    discountValue: z.ZodNumber;
    minOrderAmount: z.ZodOptional<z.ZodNumber>;
    maxDiscountAmount: z.ZodOptional<z.ZodNumber>;
    applicableTo: z.ZodOptional<z.ZodEnum<{
        category: "category";
        all: "all";
        specific_products: "specific_products";
    }>>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString>>;
    products: z.ZodOptional<z.ZodArray<z.ZodString>>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateDiscountDtoType = z.infer<typeof CreateDiscountDto>;
