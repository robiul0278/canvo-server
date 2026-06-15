import { z } from 'zod';
export declare const QueryOrderDto: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    orderStatus: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        processing: "processing";
        shipped: "shipped";
        delivered: "delivered";
        cancelled: "cancelled";
        returned: "returned";
    }>>;
    paymentStatus: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        paid: "paid";
        failed: "failed";
        refunded: "refunded";
    }>>;
    paymentMethod: z.ZodOptional<z.ZodEnum<{
        sslcommerz: "sslcommerz";
        cod: "cod";
    }>>;
    sort: z.ZodOptional<z.ZodEnum<{
        newest: "newest";
        oldest: "oldest";
        updated: "updated";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type QueryOrderDtoType = z.infer<typeof QueryOrderDto>;
