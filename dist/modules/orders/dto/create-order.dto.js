"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const zod_1 = require("zod");
const OrderItemVariationDto = zod_1.z.object({
    color: zod_1.z.string().optional(),
    colorHex: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
});
const OrderItemDto = zod_1.z.object({
    product: zod_1.z.string().min(1),
    productName: zod_1.z.string().min(1),
    productSlug: zod_1.z.string().optional(),
    variation: OrderItemVariationDto.optional(),
    quantity: zod_1.z.number().min(1),
    unitPrice: zod_1.z.number().min(0),
    totalPrice: zod_1.z.number().min(0),
});
const DeliveryAddressDto = zod_1.z.object({
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().min(1),
    district: zod_1.z.string().min(1),
    thana: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
exports.CreateOrderDto = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    guestInfo: zod_1.z
        .object({
        name: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().min(1),
    })
        .optional(),
    items: zod_1.z.array(OrderItemDto).min(1),
    subtotal: zod_1.z.number().min(0),
    discountCode: zod_1.z.string().optional(),
    discountAmount: zod_1.z.number().min(0).optional(),
    deliveryCharge: zod_1.z.number().min(0),
    totalAmount: zod_1.z.number().min(0),
    paymentMethod: zod_1.z.enum(['sslcommerz', 'cod']),
    deliveryAddress: DeliveryAddressDto,
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-order.dto.js.map