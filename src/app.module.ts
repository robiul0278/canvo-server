import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import path from 'path';

import databaseConfig from './config/database.config';
import nextauthConfig from './config/nextauth.config';
import multerConfig from './config/multer.config';
import sslcommerzConfig from './config/sslcommerz.config';
import cloudinaryConfig from './config/cloudinary.config';

import { NextAuthGuard } from './common/guards/nextauth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AppController } from './modules/app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/product.module';
import { CategoryModule } from './modules/categories/category.module';
import { OrderModule } from './modules/orders/order.module';
import { DiscountModule } from './modules/discounts/discount.module';
import { PaymentModule } from './modules/payments/payment.module';
import { FrontendContentModule } from './modules/frontend-content/frontend-content.module';
import { ReviewModule } from './modules/reviews/review.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, nextauthConfig, multerConfig, sslcommerzConfig, cloudinaryConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
        maxAge: '1d',
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    DiscountModule,
    PaymentModule,
    FrontendContentModule,
    ReviewModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: NextAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
