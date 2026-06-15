import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { CreateOrderDtoType } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import type { UpdateStatusDtoType } from './dto/update-status.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import type { QueryOrderDtoType } from './dto/query-order.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create order (auth or guest)' })
  async create(
    @Body(new ZodValidationPipe(CreateOrderDto)) body: CreateOrderDtoType,
    @CurrentUser() user?: NextAuthUser,
  ) {
    return this.orderService.create(body, user?.id);
  }

  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's orders" })
  async getMyOrders(@CurrentUser() user: NextAuthUser) {
    return this.orderService.findByUser(user.id);
  }

  @Get('my/:orderNumber')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get single user order" })
  async getMyOrder(
    @Param('orderNumber') orderNumber: string,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.orderService.findByOrderNumber(orderNumber, user.id);
  }

  @Post(':orderNumber/cancel')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel own order by order number (if pending)' })
  async cancelOrder(
    @Param('orderNumber') orderNumber: string,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.orderService.cancelOrder(orderNumber, user.id);
  }

  @Get()
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders (Admin/Moderator)' })
  async findAll(
    @Query(new ZodValidationPipe(QueryOrderDto)) query: QueryOrderDtoType,
  ) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single order by ID' })
  async findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Patch(':id/status')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order status' })
  async updateStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateStatusDto)) body: UpdateStatusDtoType,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.orderService.updateStatus(id, body, user.id);
  }

  @Patch(':id/tracking')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update tracking number' })
  async updateTracking(
    @Param('id') id: string,
    @Body('trackingNumber') trackingNumber: string,
  ) {
    return this.orderService.updateTracking(id, trackingNumber);
  }

  @Get('dashboard/stats')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard revenue stats (Admin)' })
  async getDashboardStats() {
    return this.orderService.getDashboardStats();
  }
}
