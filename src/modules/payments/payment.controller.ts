import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Response } from 'express';
import { PaymentService } from './payment.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate SSLCommerz payment' })
  async initiatePayment(
    @CurrentUser() user: NextAuthUser,
    @Body('orderId') orderId: string,
  ) {
    return this.paymentService.initiatePayment(orderId);
  }

  @Public()
  @Post('success')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz success callback' })
  async handleSuccess(
    @Body('val_id') transactionId: string,
    @Body('tran_id') orderNumber: string,
    @Res() res: Response,
  ) {
    const result = await this.paymentService.handleSuccess(transactionId, orderNumber);
    return res.redirect(result.redirect);
  }

  @Public()
  @Post('fail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz fail callback' })
  async handleFail(@Body('tran_id') orderNumber: string, @Res() res: Response) {
    const result = await this.paymentService.handleFail(orderNumber);
    return res.redirect(result.redirect);
  }

  @Public()
  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz cancel callback' })
  async handleCancel(@Body('tran_id') orderNumber: string, @Res() res: Response) {
    const result = await this.paymentService.handleCancel(orderNumber);
    return res.redirect(result.redirect);
  }

  @Public()
  @Post('ipn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz IPN webhook' })
  async handleIpn(@Body() body: any) {
    return this.paymentService.handleIpn(body);
  }
}
