import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DeleteImage, PostImage } from './image.entity/image.entity';
import { ImageService } from './image.service';

@UseGuards(AuthGuard('jwt'))
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FileInterceptor("file_image", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname) 
    })
  }))
  @Post('/post-image')
  async postImage(@Headers('Authorization') token: string, @UploadedFile() file: Express.Multer.File, @Body('description') description: string) {
    return this.imageService.postImage(token, file, description)
  }

  @HttpCode(202)
  @Get()
  async getImage(@Headers('Authorization') token: string) {
    return this.imageService.getImage();
  }

  @Get('/:image_name')
  async getImageByName(@Headers('Authorization') token: string, @Param('image_name') image_name: string) {
    return this.imageService.getImageByName(image_name);
  }

  @Get('/:image_id')
  async getImageById(@Headers('Authorization') token: string, @Param('image_id', ParseIntPipe) image_id: number) {
    return this.imageService.getImageInfoById(image_id);
  }

  @Get('/comment/:image_id')
  async getCommentByImageId(@Headers('Authorization') token: string, @Param('image_id', ParseIntPipe) image_id: number) {
    return this.imageService.getCommentByImageId(image_id);
  }

  @Delete('/delete-image/:image_id')
  async deleteImage(@Headers('Authorization') token: string, @Param('image_id', ParseIntPipe) image_id: number) {
    return this.imageService.deleteImage(token, image_id);
  }

  // @Get('/image-created-by/:user_id')
  // async getImageCreatedByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
  //     return this.imageService.getImageCreatedByUserId(user_id)
  // }
}
