import * as crypto from 'crypto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SSLCommerzPayment from 'sslcommerz-lts';

@Injectable()
export class SSLCommerzService {
  private sslcz: SSLCommerzPayment;
  private isLive: boolean;
  private storePass: string;

  constructor(private configService: ConfigService) {
    this.isLive = this.configService.get<boolean>('sslcommerz.isLive') || false;
    this.storePass = this.configService.get<string>('sslcommerz.storePass') || '';
    this.sslcz = new SSLCommerzPayment(
      this.configService.get<string>('sslcommerz.storeId') || '',
      this.storePass,
      this.isLive,
    );
  }

  async initiatePayment(data: {
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
  }) {
    const orderData = {
      total_amount: data.totalAmount,
      currency: data.currency || 'BDT',
      tran_id: data.tranId,
      success_url: data.successUrl,
      fail_url: data.failUrl,
      cancel_url: data.cancelUrl,
      ipn_url: data.ipnUrl,
      cus_name: data.customerName,
      cus_email: data.customerEmail,
      cus_phone: data.customerPhone,
      cus_add1: data.customerAddress,
      cus_city: data.customerCity,
      cus_country: 'Bangladesh',
      shipping_method: 'NO',
      product_name: 'CANVO Order',
      product_category: 'Fashion',
      product_profile: 'general',
    };

    try {
      const response = await this.sslcz.init({
        ...orderData,
        multi_card_name: '',
        allowed_from: '',
        profile_id: '',
        emi_option: 0,
        emi_max_installment: 0,
        emi_allow_only: 0,
      });

      return response;
    } catch (error) {
      throw new HttpException(
        'Failed to initiate SSLCommerz payment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateTransaction(transactionId: string): Promise<boolean> {
    try {
      const response = await this.sslcz.validate({ val_id: transactionId });
      return response.status === 'VALID' || response.status === 'VALIDATED';
    } catch {
      return false;
    }
  }

  verifyIpn(payload: Record<string, any>): boolean {
    const verifySign = payload['verify_sign'];
    const verifyKey = payload['verify_key'];

    if (!verifySign || !verifyKey) return false;

    const keys = verifyKey.split(',').sort();
    const dataString = keys.map((key) => payload[key] || '').join('&') + '&' + this.storePass;
    const hash = crypto.createHash('sha512').update(dataString).digest('hex').toLowerCase();

    return hash === verifySign.toLowerCase();
  }
}
