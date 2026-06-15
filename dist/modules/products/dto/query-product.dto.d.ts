import { z } from 'zod';
export declare const QueryProductDto: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    tag: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<{
        newest: "newest";
        price_asc: "price_asc";
        price_desc: "price_desc";
        popular: "popular";
        rating: "rating";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QueryProductDtoType = z.infer<typeof QueryProductDto>;
