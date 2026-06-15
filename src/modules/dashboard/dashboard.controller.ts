import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get dashboard overview stats' })
  async getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get('revenue-chart')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get revenue chart data' })
  async getRevenueChart(@Query('period') period: string) {
    return this.dashboardService.getRevenueChart(period || '30d');
  }

  @Get('top-products')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get top selling products' })
  async getTopProducts(@Query('limit') limit?: number) {
    return this.dashboardService.getTopProducts(limit || 5);
  }

  @Get('recent-orders')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get recent orders' })
  async getRecentOrders(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentOrders(limit || 10);
  }

  @Get('stock-alerts')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get low stock alerts' })
  async getStockAlerts() {
    return this.dashboardService.getStockAlerts();
  }

  @Get('order-status-breakdown')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get order status breakdown' })
  async getOrderStatusBreakdown() {
    return this.dashboardService.getOrderStatusBreakdown();
  }
}
