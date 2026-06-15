import { z } from 'zod';

export const AddressDto = z.object({
  label: z.string().min(1),
  district: z.string().min(1),
  thana: z.string().min(1),
  address: z.string().min(1),
  isDefault: z.boolean().optional(),
});

export const UpdateProfileDto = z.object({
  phone: z.string().optional(),
  addresses: z.array(AddressDto).optional(),
});

export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;
