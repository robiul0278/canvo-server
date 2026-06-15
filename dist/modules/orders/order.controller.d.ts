import { OrderService } from './order.service';
import type { CreateOrderDtoType } from './dto/create-order.dto';
import type { UpdateStatusDtoType } from './dto/update-status.dto';
import type { QueryOrderDtoType } from './dto/query-order.dto';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(body: CreateOrderDtoType, user?: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyOrders(user: NextAuthUser): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyOrder(orderNumber: string, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    cancelOrder(orderNumber: string, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: QueryOrderDtoType): Promise<import("../../common/helpers/query.helper").PaginatedResult<unknown>>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, body: UpdateStatusDtoType, user: NextAuthUser): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTracking(id: string, trackingNumber: string): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getDashboardStats(): Promise<{
        totalOrders: number;
        totalRevenue: any;
        todayOrders: number;
        todayRevenue: any;
    }>;
}
