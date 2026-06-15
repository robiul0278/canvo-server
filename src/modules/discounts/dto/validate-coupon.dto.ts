import { z } from 'zod';

export const ValidateCouponDto = z.object({
  code: z.string().min(1),
  orderAmount: z.number().min(0),
  productIds: z.array(z.string()).optional(),
});

export type ValidateCouponDtoType = z.infer<typeof ValidateCouponDto>;
