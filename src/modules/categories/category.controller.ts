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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all visible categories (public)' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get('admin/all')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all categories (Admin)' })
  async findAllAdmin() {
    return this.categoryService.findAllAdmin();
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get single category by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create category (Admin)' })
  async create(@Body() body: { name: string; image?: string; icon?: string }) {
    return this.categoryService.create(body);
  }

  @Patch('reorder')
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder categories (Admin)' })
  async reorder(@Body() body: { id: string; order: number }[]) {
    return this.categoryService.reorder(body);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category (Admin)' })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; image: string; icon: string; order: number; isVisible: boolean }>,
  ) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete category (Admin)' })
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Post(':id/image')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload category image (Admin)' })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.uploadImage(id, file);
  }
}
