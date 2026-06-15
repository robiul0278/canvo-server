import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FrontendContent,
  FrontendContentDocument,
} from './frontend-content.schema';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

@Injectable()
export class FrontendContentService {
  constructor(
    @InjectModel(FrontendContent.name)
    private contentModel: Model<FrontendContentDocument>,
  ) {}

  async findAllActive() {
    return this.contentModel
      .find({ isActive: true })
      .select('-__v')
      .exec();
  }

  async findBySection(section: string) {
    const content = await this.contentModel
      .findOne({ section, isActive: true })
      .exec();

    if (!content) {
      throw new NotFoundException(`Content section '${section}' not found`);
    }

    return content;
  }

  async upsert(
    section: string,
    data: Record<string, any>,
    userId: string,
  ) {
    return this.contentModel
      .findOneAndUpdate(
        { section },
        {
          section,
          data,
          updatedBy: userId as any,
          isActive: true,
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  async uploadImage(file: Express.Multer.File, type: 'hero' | 'banner') {
    const uploadDir = path.join(
      process.env.UPLOAD_PATH || './uploads',
      'frontend',
      type,
    );
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `${type}_${Date.now()}.webp`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(file.buffer)
      .resize(1920, 1080, { fit: 'cover', position: 'centre' })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const relativePath = `/uploads/frontend/${type}/${filename}`;

    return { success: true, data: { url: relativePath } };
  }
}
