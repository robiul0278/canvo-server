"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSLCommerzService = void 0;
const crypto = __importStar(require("crypto"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
let SSLCommerzService = class SSLCommerzService {
    configService;
    sslcz;
    isLive;
    storePass;
    constructor(configService) {
        this.configService = configService;
        this.isLive = this.configService.get('sslcommerz.isLive') || false;
        this.storePass = this.configService.get('sslcommerz.storePass') || '';
        this.sslcz = new sslcommerz_lts_1.default(this.configService.get('sslcommerz.storeId') || '', this.storePass, this.isLive);
    }
    async initiatePayment(data) {
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
        }
        catch (error) {
            throw new common_1.HttpException('Failed to initiate SSLCommerz payment', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async validateTransaction(transactionId) {
        try {
            const response = await this.sslcz.validate({ val_id: transactionId });
            return response.status === 'VALID' || response.status === 'VALIDATED';
        }
        catch {
            return false;
        }
    }
    verifyIpn(payload) {
        const verifySign = payload['verify_sign'];
        const verifyKey = payload['verify_key'];
        if (!verifySign || !verifyKey)
            return false;
        const keys = verifyKey.split(',').sort();
        const dataString = keys.map((key) => payload[key] || '').join('&') + '&' + this.storePass;
        const hash = crypto.createHash('sha512').update(dataString).digest('hex').toLowerCase();
        return hash === verifySign.toLowerCase();
    }
};
exports.SSLCommerzService = SSLCommerzService;
exports.SSLCommerzService = SSLCommerzService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SSLCommerzService);
//# sourceMappingURL=sslcommerz.service.js.map