import { z } from 'zod';

export const QueryProductDto = z.object({
  category: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  tag: z.string().optional(),
  sort: z
    .enum(['newest', 'price_asc', 'price_desc', 'popular', 'rating'])
    .optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  search: z.string().optional(),
});

export type QueryProductDtoType = z.infer<typeof QueryProductDto>;
