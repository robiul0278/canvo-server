import { z } from 'zod';

const ProductImageDto = z.object({
  url: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  order: z.number().optional(),
  isDefault: z.boolean().optional(),
});

const ProductSizeDto = z.object({
  size: z.string().min(1),
  stock: z.number().min(0).optional(),
  priceOverride: z.number().optional(),
});

const ProductVariationDto = z.object({
  color: z.string().min(1),
  colorHex: z.string().min(1),
  images: z.array(ProductImageDto).optional(),
  sizes: z.array(ProductSizeDto).optional(),
});

export const CreateProductDto = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  basePrice: z.number().min(0, 'Base price must be positive'),
  discountType: z.enum(['none', 'percentage', 'flat']).optional(),
  discountValue: z.number().min(0).optional(),
  variations: z.array(ProductVariationDto).optional(),
  isFeatured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
