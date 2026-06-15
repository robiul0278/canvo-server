import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrontendContentController } from './frontend-content.controller';
import { FrontendContentService } from './frontend-content.service';
import {
  FrontendContent,
  FrontendContentSchema,
} from './frontend-content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FrontendContent.name, schema: FrontendContentSchema },
    ]),
  ],
  controllers: [FrontendContentController],
  providers: [FrontendContentService],
  exports: [FrontendContentService],
})
export class FrontendContentModule {}
