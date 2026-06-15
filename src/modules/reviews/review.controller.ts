import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { QueryReviewDto } from './dto/query-review.dto';
import type { QueryReviewDtoType } from './dto/query-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create review (auth required)' })
  async create(
    @CurrentUser() user: NextAuthUser,
    @Body()
    body: {
      product: string;
      rating: number;
      title?: string;
      comment?: string;
      images?: string[];
    },
  ) {
    return this.reviewService.create(body, user.id);
  }

  @Public()
  @Get('product/:id')
  @ApiOperation({ summary: 'Get approved reviews for a product' })
  async findByProduct(@Param('id') id: string) {
    return this.reviewService.findByProduct(id);
  }

  @Get()
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews (Admin/Moderator)' })
  async findAll(
    @Query(new ZodValidationPipe(QueryReviewDto)) query: QueryReviewDtoType,
  ) {
    return this.reviewService.findAll(query);
  }

  @Patch(':id/approve')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve review (Admin/Moderator)' })
  async approve(@Param('id') id: string) {
    return this.reviewService.approve(id);
  }

  @Patch(':id/reply')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reply to review (Admin/Moderator)' })
  async reply(
    @Param('id') id: string,
    @Body('adminReply') adminReply: string,
  ) {
    return this.reviewService.reply(id, adminReply);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete review (Admin)' })
  async remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
