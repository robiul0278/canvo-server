import { ConfigService } from '@nestjs/config';
export declare class SSLCommerzService {
    private configService;
    private sslcz;
    private isLive;
    private storePass;
    constructor(configService: ConfigService);
    initiatePayment(data: {
        totalAmount: number;
        currency?: string;
        tranId: string;
        successUrl: string;
        failUrl: string;
        cancelUrl: string;
        ipnUrl: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        customerAddress: string;
        customerCity: string;
    }): Promise<any>;
    validateTransaction(transactionId: string): Promise<boolean>;
    verifyIpn(payload: Record<string, any>): boolean;
}
