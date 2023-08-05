import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SaveImageService {
  private prisma: PrismaClient;

  constructor(
    private readonly jwtService: JwtService
  ) {
    this.prisma = new PrismaClient();
  }

  // POST lưu ảnh theo user_id và image_id
  async postSaveImage(token: string, image_id: number) {
    const decodedToken = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if(!user_id) {
      throw new UnauthorizedException("Invalid Token");
    }
    const existingSave = await this.prisma.save_image.findUnique({
      where: {
        user_id_image_id: { user_id, image_id },
      },
    });

    if (existingSave) {
      await this.prisma.save_image.delete({
        where: {
          user_id_image_id: { user_id, image_id },
        },
      });
      return { message: 'Unsave images successfully.' };
    } else {
      const save_date = new Date();
      const data = await this.prisma.save_image.create({
        data: {
          user_id,
          image_id,
          save_date,
        },
      });
      return { message: 'Image saved successfully.', data };
    }
  }

  // GET danh sách ảnh đã lưu theo user_id
  async getSavedImageByUserId(token: string) {
    const decodedToken = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if(!user_id) {
      throw new UnauthorizedException("Invalid Token");
    }
    const data = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        save_image: {
          select: {
            image_id: true,
            save_date: true,
            image: true,
          },
        }
      },
    });
    return data;
  }

    // Get thông tin đã lưa hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
  async getCheckSavedImageById(token: string, image_id: number) {
    const decodedToken = this.jwtService.decode(
      token.replace("Bearer ", ""),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if(!user_id) {
      throw new UnauthorizedException("Invalid Token")
    }
    const checkSavedImage = await this.prisma.save_image.findUnique({
      where:{
        user_id_image_id: {user_id, image_id}
      }
    })
    const result = checkSavedImage? true : false;
    return result;
  }
}
