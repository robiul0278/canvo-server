import { z } from 'zod';

export const CreateDiscountDto = z.object({
  type: z.enum(['coupon_code', 'product_discount', 'flash_sale', 'bundle']),
  code: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  discountType: z.enum(['percentage', 'flat_amount']),
  discountValue: z.number().min(1),
  minOrderAmount: z.number().min(0).optional(),
  maxDiscountAmount: z.number().optional(),
  applicableTo: z.enum(['all', 'category', 'specific_products']).optional(),
  categories: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  usageLimit: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type CreateDiscountDtoType = z.infer<typeof CreateDiscountDto>;
