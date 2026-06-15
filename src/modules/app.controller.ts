import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getRoot() {
    return {
      name: 'CANVO API',
      version: '1.0',
      docs: '/api/docs',
      endpoints: {
        products: '/api/products',
        categories: '/api/categories',
        auth: '/api/auth/sync',
        orders: '/api/orders',
        discounts: '/api/discounts/validate',
      },
    };
  }
}
