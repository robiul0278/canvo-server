import { z } from 'zod';
export declare const AddressDto: z.ZodObject<{
    label: z.ZodString;
    district: z.ZodString;
    thana: z.ZodString;
    address: z.ZodString;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const UpdateProfileDto: z.ZodObject<{
    phone: z.ZodOptional<z.ZodString>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        district: z.ZodString;
        thana: z.ZodString;
        address: z.ZodString;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;
