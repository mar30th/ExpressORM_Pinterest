import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SaveImageService } from './save_image.service';

@ApiTags("Save Image")
@UseGuards(AuthGuard("jwt"))
@Controller('save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) {}

  @Get('/my-saved-image')
  async getSavedImageByUserId(@Headers("Authorization") token: string) {
    return this.saveImageService.getSavedImageByUserId(token);
  }

  @Post('/post-save-image')
  async postSaveImage(@Headers("Authorization") token: string, @Body('image_id', ParseIntPipe) image_id: number) {
    return this.saveImageService.postSaveImage(token, image_id);
  }

  @Get('check-saved-image/:image_id')
  async getCheckSavedImageById(@Headers("Authorization") token: string, @Param("image_id", ParseIntPipe) image_id: number) {
    return this.saveImageService.getCheckSavedImageById(token, image_id)
  }
}
