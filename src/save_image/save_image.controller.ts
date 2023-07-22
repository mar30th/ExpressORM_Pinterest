import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SaveImage } from './save_image.entity/save_image.entity';
import { SaveImageService } from './save_image.service';

@Controller('save-image')
export class SaveImageController {
    constructor (private readonly saveImageService: SaveImageService) {}

    @Post('/post-save-image')
    async postSaveImage(@Body() saveImage: SaveImage) {
        return this.saveImageService.postSaveImage(saveImage)
    }

    @Get('/:user_id')
    async getSavedImageByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
        return this.saveImageService.getSavedImageByUserId(user_id);
    }
}
