import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ImageProcessorService } from './image-processor.service';
import { CreateProductDto } from './dto/create-product.dto';
import type { CreateProductDtoType } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import type { QueryProductDtoType } from './dto/query-product.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products (public, paginated)' })
  async findAll(
    @Query(new ZodValidationPipe(QueryProductDto)) query: QueryProductDtoType,
  ) {
    return this.productService.findAll(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  async findFeatured() {
    return this.productService.findFeatured();
  }

  @Public()
  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get new arrival products' })
  async findNewArrivals() {
    return this.productService.findNewArrivals();
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get single product by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Post()
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (Admin/Moderator)' })
  async create(
    @Body(new ZodValidationPipe(CreateProductDto)) body: CreateProductDtoType,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.productService.create(body, user.id);
  }

  @Patch(':id')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (Admin/Moderator)' })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDtoType>,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product (Admin/Moderator)' })
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post(':id/images')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 8))
  @ApiOperation({ summary: 'Upload product images (Admin/Moderator)' })
  async uploadImages(
    @Param('id') id: string,
    @Body('colorSlug') colorSlug: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const results = await Promise.all(
      files.map((f) => this.imageProcessor.processProductImage(f, id, colorSlug || 'default')),
    );
    return results;
  }

  @Delete(':id/images/:imgId')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete individual image from product variation' })
  async removeImage(
    @Param('id') id: string,
    @Param('imgId') imgId: string,
  ) {
    return this.productService.removeImage(id, imgId);
  }

  @Patch(':id/images/reorder')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder images in a product variation' })
  async reorderImages(
    @Param('id') id: string,
    @Body() body: { variationIndex: number; imageIds: string[] },
  ) {
    return this.productService.reorderImages(id, body.variationIndex, body.imageIds);
  }

  @Get('dashboard/all')
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products for dashboard' })
  async findDashboardAll() {
    return this.productService.findDashboardAll();
  }
}
