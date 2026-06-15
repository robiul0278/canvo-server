import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

@Injectable()
export class ImageProcessorService {
  async processProductImage(
    file: Express.Multer.File,
    productId: string,
    colorSlug: string,
  ): Promise<{ url: string; thumbnailUrl: string }> {
    const uploadDir = path.join(
      process.env.UPLOAD_PATH || './uploads',
      'products',
      productId,
      colorSlug,
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const filename = `${timestamp}.webp`;
    const thumbnailFilename = `${timestamp}_thumb.webp`;

    const outputPath = path.join(uploadDir, filename);
    const thumbnailPath = path.join(uploadDir, thumbnailFilename);

    await sharp(file.buffer)
      .resize(800, 1000, { fit: 'cover', position: 'centre' })
      .webp({ quality: 85 })
      .toFile(outputPath);

    await sharp(file.buffer)
      .resize(400, 500, { fit: 'cover', position: 'centre' })
      .webp({ quality: 70 })
      .toFile(thumbnailPath);

    const relativePath = (p: string) =>
      p.replace(/\\/g, '/').replace(/^.*\/uploads\//, '/uploads/');

    return {
      url: relativePath(outputPath),
      thumbnailUrl: relativePath(thumbnailPath),
    };
  }

  async deleteProductImage(filePath: string): Promise<void> {
    const fullPath = path.join(
      process.env.UPLOAD_PATH || './uploads',
      filePath.replace('/uploads/', ''),
    );
    try {
      await fs.unlink(fullPath);
      const thumbPath = fullPath.replace('.webp', '_thumb.webp');
      await fs.unlink(thumbPath).catch(() => {});
    } catch {}
  }
}
