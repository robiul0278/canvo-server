import { z } from 'zod';
export declare const QueryUserDto: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
        moderator: "moderator";
    }>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    sort: z.ZodOptional<z.ZodEnum<{
        newest: "newest";
        oldest: "oldest";
        name_asc: "name_asc";
        name_desc: "name_desc";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type QueryUserDtoType = z.infer<typeof QueryUserDto>;
