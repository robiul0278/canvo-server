import { z } from 'zod';

const OrderItemVariationDto = z.object({
  color: z.string().optional(),
  colorHex: z.string().optional(),
  size: z.string().optional(),
  imageUrl: z.string().optional(),
});

const OrderItemDto = z.object({
  product: z.string().min(1),
  productName: z.string().min(1),
  productSlug: z.string().optional(),
  variation: OrderItemVariationDto.optional(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
});

const DeliveryAddressDto = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  district: z.string().min(1),
  thana: z.string().min(1),
  address: z.string().min(1),
});

export const CreateOrderDto = z.object({
  userId: z.string().optional(),
  guestInfo: z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
    })
    .optional(),
  items: z.array(OrderItemDto).min(1),
  subtotal: z.number().min(0),
  discountCode: z.string().optional(),
  discountAmount: z.number().min(0).optional(),
  deliveryCharge: z.number().min(0),
  totalAmount: z.number().min(0),
  paymentMethod: z.enum(['sslcommerz', 'cod']),
  deliveryAddress: DeliveryAddressDto,
  notes: z.string().optional(),
});

export type CreateOrderDtoType = z.infer<typeof CreateOrderDto>;
