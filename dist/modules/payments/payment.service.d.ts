import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { SSLCommerzService } from './sslcommerz.service';
import { OrderDocument } from '../orders/order.schema';
import { ProductDocument } from '../products/product.schema';
export declare class PaymentService {
    private orderModel;
    private userModel;
    private productModel;
    private sslCommerzService;
    private configService;
    constructor(orderModel: Model<OrderDocument>, userModel: Model<any>, productModel: Model<ProductDocument>, sslCommerzService: SSLCommerzService, configService: ConfigService);
    initiatePayment(orderId: string): Promise<{
        gatewayUrl: any;
        orderNumber: string;
    }>;
    handleSuccess(transactionId: string, orderNumber: string): Promise<{
        redirect: string;
    }>;
    handleFail(orderNumber: string): Promise<{
        redirect: string;
    }>;
    handleCancel(orderNumber: string): Promise<{
        redirect: string;
    }>;
    handleIpn(data: any): Promise<{
        error: string;
    } | undefined>;
    private getCustomerFromUser;
}
