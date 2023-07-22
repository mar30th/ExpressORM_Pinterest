import { Module } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { SaveImageController } from './save_image.controller';

@Module({
  providers: [SaveImageService],
  controllers: [SaveImageController]
})
export class SaveImageModule {}
