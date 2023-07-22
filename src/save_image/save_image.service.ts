import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SaveImage } from './save_image.entity/save_image.entity';

@Injectable()
export class SaveImageService {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    // POST lưu ảnh theo user_id và image_id
    async postSaveImage(saveimgage: SaveImage) {
        const {user_id, image_id} = saveimgage
        const save_date = new Date();

        const data = await this.prisma.save_image.create({
            data: {
                user_id,
                image_id,
                save_date
            }
        })

        return data
    }

    // GET danh sách ảnh đã lưu theo user_id
    async getSavedImageByUserId(user_id: number) {
        const data = await this.prisma.user.findMany({
            where: {
                user_id
            },
            include: {
                save_image: true
            }
        })

        return data
    }
}
