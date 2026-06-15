import { registerAs } from '@nestjs/config';

export default registerAs('sslcommerz', () => ({
  storeId: process.env.SSLCOMMERZ_STORE_ID || '',
  storePass: process.env.SSLCOMMERZ_STORE_PASS || '',
  isLive: process.env.SSLCOMMERZ_IS_LIVE === 'true',
  sandboxUrl: 'https://sandbox.sslcommerz.com',
  liveUrl: 'https://secure.sslcommerz.com',
}));
