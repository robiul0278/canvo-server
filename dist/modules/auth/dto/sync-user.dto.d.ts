import { z } from 'zod';
export declare const SyncUserDto: z.ZodObject<{
    googleId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SyncUserDtoType = z.infer<typeof SyncUserDto>;
