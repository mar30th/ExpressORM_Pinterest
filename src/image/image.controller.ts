import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostImage } from './image.entity/image.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    async getImage() {
        return this.imageService.getImage();
    }

    @Get('/name/:image_name')
    async getImageByName(@Param("image_name") image_name: string) {
        return this.imageService.getImageByName(image_name);
    }

    @Get('/id/:image_id')
    async getImageInfoById(@Param('image_id', ParseIntPipe) image_id: number) {
        return this.imageService.getImageInfoById(image_id)
    }

    @Get('/id/comment/:image_id')
    async getCommentByImageId(@Param('image_id', ParseIntPipe) image_id: number) {
        return this.imageService.getCommentByImageId(image_id)
    }

    @Get('/id/savedimage/:image_id')
    async getSavedImageById(@Param('image_id', ParseIntPipe) image_id: number) {
        return this.imageService.getSavedImageById(image_id)
    }

    @Post('/post-image')
    async postImage(@Body() image: PostImage) {
        return this.imageService.postImage(image)
    }

    @Delete('/delete-image/:image_id')
    async deleteImage(@Param('image_id', ParseIntPipe) image_id: number) {
        return this.imageService.deleteImage(image_id)
    }

    // @Get('/image-created-by/:user_id')
    // async getImageCreatedByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    //     return this.imageService.getImageCreatedByUserId(user_id)
    // }
}
