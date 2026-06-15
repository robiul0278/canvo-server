import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import type { CreateDiscountDtoType } from './dto/create-discount.dto';
import { ValidateCouponDto } from './dto/validate-coupon.dto';
import type { ValidateCouponDtoType } from './dto/validate-coupon.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create discount (Admin)' })
  async create(
    @Body(new ZodValidationPipe(CreateDiscountDto)) body: CreateDiscountDtoType,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.discountService.create(body, user.id);
  }

  @Get()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all discounts (Admin)' })
  async findAll() {
    return this.discountService.findAll();
  }

  @Patch(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update discount (Admin)' })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateDiscountDtoType>,
  ) {
    return this.discountService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete discount (Admin)' })
  async remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }

  @Public()
  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate coupon code (public)' })
  async validateCoupon(
    @Body(new ZodValidationPipe(ValidateCouponDto)) body: ValidateCouponDtoType,
  ) {
    return this.discountService.validateCoupon(body);
  }
}
