import { z } from 'zod';

export const SyncUserDto = z.object({
  googleId: z.string().min(1, 'Google ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  avatar: z.string().optional(),
});

export type SyncUserDtoType = z.infer<typeof SyncUserDto>;
