import { registerAs } from '@nestjs/config';

export default registerAs('multer', () => ({
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '102400', 10),
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 8,
}));
