import { z } from 'zod';
export declare const CreateProductDto: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    basePrice: z.ZodNumber;
    discountType: z.ZodOptional<z.ZodEnum<{
        flat: "flat";
        none: "none";
        percentage: "percentage";
    }>>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    variations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        color: z.ZodString;
        colorHex: z.ZodString;
        images: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodOptional<z.ZodString>;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
            order: z.ZodOptional<z.ZodNumber>;
            isDefault: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>>;
        sizes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            size: z.ZodString;
            stock: z.ZodOptional<z.ZodNumber>;
            priceOverride: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isNewArrival: z.ZodOptional<z.ZodBoolean>;
    isBestseller: z.ZodOptional<z.ZodBoolean>;
    isPublished: z.ZodOptional<z.ZodBoolean>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
