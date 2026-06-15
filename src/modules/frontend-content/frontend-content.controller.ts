import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FrontendContentService } from './frontend-content.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';

@ApiTags('Frontend Content')
@Controller('frontend-content')
export class FrontendContentController {
  constructor(
    private readonly contentService: FrontendContentService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all active frontend sections (public)' })
  async findAllActive() {
    return this.contentService.findAllActive();
  }

  @Public()
  @Get(':section')
  @ApiOperation({ summary: 'Get single section content (public)' })
  async findBySection(@Param('section') section: string) {
    return this.contentService.findBySection(section);
  }

  @Put(':section')
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upsert section content (Admin)' })
  async upsert(
    @Param('section') section: string,
    @Body('data') data: Record<string, any>,
    @CurrentUser() user: NextAuthUser,
  ) {
    return this.contentService.upsert(section, data, user.id);
  }

  @Post('hero/image')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload hero image (Admin)' })
  async uploadHeroImage(@UploadedFile() file: Express.Multer.File) {
    return this.contentService.uploadImage(file, 'hero');
  }

  @Post('banner/image')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload promo banner image (Admin)' })
  async uploadBannerImage(@UploadedFile() file: Express.Multer.File) {
    return this.contentService.uploadImage(file, 'banner');
  }
}
