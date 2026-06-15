"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const serve_static_1 = require("@nestjs/serve-static");
const core_1 = require("@nestjs/core");
const path_1 = __importDefault(require("path"));
const database_config_1 = __importDefault(require("./config/database.config"));
const nextauth_config_1 = __importDefault(require("./config/nextauth.config"));
const multer_config_1 = __importDefault(require("./config/multer.config"));
const sslcommerz_config_1 = __importDefault(require("./config/sslcommerz.config"));
const cloudinary_config_1 = __importDefault(require("./config/cloudinary.config"));
const nextauth_guard_1 = require("./common/guards/nextauth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const app_controller_1 = require("./modules/app.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const product_module_1 = require("./modules/products/product.module");
const category_module_1 = require("./modules/categories/category.module");
const order_module_1 = require("./modules/orders/order.module");
const discount_module_1 = require("./modules/discounts/discount.module");
const payment_module_1 = require("./modules/payments/payment.module");
const frontend_content_module_1 = require("./modules/frontend-content/frontend-content.module");
const review_module_1 = require("./modules/reviews/review.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, nextauth_config_1.default, multer_config_1.default, sslcommerz_config_1.default, cloudinary_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    uri: config.get('database.uri'),
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.default.join(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    index: false,
                    maxAge: '1d',
                },
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            order_module_1.OrderModule,
            discount_module_1.DiscountModule,
            payment_module_1.PaymentModule,
            frontend_content_module_1.FrontendContentModule,
            review_module_1.ReviewModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: nextauth_guard_1.NextAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map