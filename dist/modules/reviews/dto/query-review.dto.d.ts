import { z } from 'zod';
export declare const QueryReviewDto: z.ZodObject<{
    isApproved: z.ZodOptional<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    rating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<{
        newest: "newest";
        oldest: "oldest";
        rating_asc: "rating_asc";
        rating_desc: "rating_desc";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type QueryReviewDtoType = z.infer<typeof QueryReviewDto>;
