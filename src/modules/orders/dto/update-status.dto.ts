import { z } from 'zod';

export const UpdateStatusDto = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'returned',
  ]),
  note: z.string().optional(),
});

export type UpdateStatusDtoType = z.infer<typeof UpdateStatusDto>;
