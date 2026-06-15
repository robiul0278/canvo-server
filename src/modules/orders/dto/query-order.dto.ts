import { z } from 'zod';

export const QueryOrderDto = z.object({
  search: z.string().optional(),
  orderStatus: z
    .enum([
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned',
    ])
    .optional(),
  paymentStatus: z
    .enum(['pending', 'paid', 'failed', 'refunded'])
    .optional(),
  paymentMethod: z.enum(['sslcommerz', 'cod']).optional(),
  sort: z
    .enum(['newest', 'oldest', 'updated'])
    .optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type QueryOrderDtoType = z.infer<typeof QueryOrderDto>;
