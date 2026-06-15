"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getOverview() {
        return this.dashboardService.getOverview();
    }
    async getRevenueChart(period) {
        return this.dashboardService.getRevenueChart(period || '30d');
    }
    async getTopProducts(limit) {
        return this.dashboardService.getTopProducts(limit || 5);
    }
    async getRecentOrders(limit) {
        return this.dashboardService.getRecentOrders(limit || 10);
    }
    async getStockAlerts() {
        return this.dashboardService.getStockAlerts();
    }
    async getOrderStatusBreakdown() {
        return this.dashboardService.getOrderStatusBreakdown();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard overview stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('revenue-chart'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get revenue chart data' }),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRevenueChart", null);
__decorate([
    (0, common_1.Get)('top-products'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top selling products' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('recent-orders'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent orders' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentOrders", null);
__decorate([
    (0, common_1.Get)('stock-alerts'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get low stock alerts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStockAlerts", null);
__decorate([
    (0, common_1.Get)('order-status-breakdown'),
    (0, roles_decorator_1.Roles)('admin', 'moderator'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order status breakdown' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getOrderStatusBreakdown", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map