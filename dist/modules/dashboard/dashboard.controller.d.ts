import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getOverview(): Promise<{
        totalRevenue: any;
        todayRevenue: any;
        totalOrders: number;
        todayOrders: number;
        totalCustomers: number;
        newCustomersThisMonth: number;
        pendingOrders: number;
        lowStockProducts: number;
        conversionRate: number;
    }>;
    getRevenueChart(period: string): Promise<{
        labels: any[];
        data: any[];
    }>;
    getTopProducts(limit?: number): Promise<any[]>;
    getRecentOrders(limit?: number): Promise<(import("mongoose").Document<unknown, {}, import("../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getStockAlerts(): Promise<any[]>;
    getOrderStatusBreakdown(): Promise<Record<string, number>>;
}
