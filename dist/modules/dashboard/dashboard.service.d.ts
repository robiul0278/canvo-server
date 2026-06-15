import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/order.schema';
import { ProductDocument } from '../products/product.schema';
import { UserDocument } from '../users/user.schema';
export declare class DashboardService {
    private orderModel;
    private productModel;
    private userModel;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductDocument>, userModel: Model<UserDocument>);
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
    getRecentOrders(limit?: number): Promise<(import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getStockAlerts(): Promise<any[]>;
    getOrderStatusBreakdown(): Promise<Record<string, number>>;
}
