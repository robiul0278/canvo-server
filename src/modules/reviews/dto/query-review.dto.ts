import { z } from 'zod';

export const QueryReviewDto = z.object({
  isApproved: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  search: z.string().optional(),
  sort: z
    .enum(['newest', 'oldest', 'rating_asc', 'rating_desc'])
    .optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type QueryReviewDtoType = z.infer<typeof QueryReviewDto>;
