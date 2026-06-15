import { z } from 'zod';
export declare const CreateOrderDto: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    guestInfo: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, z.core.$strip>>;
    items: z.ZodArray<z.ZodObject<{
        product: z.ZodString;
        productName: z.ZodString;
        productSlug: z.ZodOptional<z.ZodString>;
        variation: z.ZodOptional<z.ZodObject<{
            color: z.ZodOptional<z.ZodString>;
            colorHex: z.ZodOptional<z.ZodString>;
            size: z.ZodOptional<z.ZodString>;
            imageUrl: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        totalPrice: z.ZodNumber;
    }, z.core.$strip>>;
    subtotal: z.ZodNumber;
    discountCode: z.ZodOptional<z.ZodString>;
    discountAmount: z.ZodOptional<z.ZodNumber>;
    deliveryCharge: z.ZodNumber;
    totalAmount: z.ZodNumber;
    paymentMethod: z.ZodEnum<{
        sslcommerz: "sslcommerz";
        cod: "cod";
    }>;
    deliveryAddress: z.ZodObject<{
        name: z.ZodString;
        phone: z.ZodString;
        district: z.ZodString;
        thana: z.ZodString;
        address: z.ZodString;
    }, z.core.$strip>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateOrderDtoType = z.infer<typeof CreateOrderDto>;
