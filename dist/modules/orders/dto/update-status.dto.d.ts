import { z } from 'zod';
export declare const UpdateStatusDto: z.ZodObject<{
    status: z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        processing: "processing";
        shipped: "shipped";
        delivered: "delivered";
        cancelled: "cancelled";
        returned: "returned";
    }>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateStatusDtoType = z.infer<typeof UpdateStatusDto>;
