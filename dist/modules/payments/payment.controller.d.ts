import type { Response } from 'express';
import { PaymentService } from './payment.service';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initiatePayment(user: NextAuthUser, orderId: string): Promise<{
        gatewayUrl: any;
        orderNumber: string;
    }>;
    handleSuccess(transactionId: string, orderNumber: string, res: Response): Promise<void>;
    handleFail(orderNumber: string, res: Response): Promise<void>;
    handleCancel(orderNumber: string, res: Response): Promise<void>;
    handleIpn(body: any): Promise<{
        error: string;
    } | undefined>;
}
