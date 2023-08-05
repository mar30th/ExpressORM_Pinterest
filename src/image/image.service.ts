import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {
  private prisma: PrismaClient;

  constructor(private readonly jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  // Get danh sách ảnh về
  async getImage() {
    try {
      const data = await this.prisma.image.findMany();
      return data;
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // Get tìm kiếm danh sách ảnh theo tên
  async getImageByName(name: string) {
    try {
      const data = await this.prisma.image.findMany({
        where: {
          image_name: {
            contains: name,
          },
        },
      });
      if (data.length > 0) {
        return {mesage: "success", data};
      } else {
        return {message: `Can't find image name with '${name}'`}
      }
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // Get thông tin ảnh và người tạo ảnh bằng ID ảnh
  async getImageInfoById(image_id: number) {
    try {
      const data = await this.prisma.image.findUnique({
        where: {
          image_id,
        },
        include: {
          user : {
            select: {
              user_id: true,
              email: true,
              full_name: true,
              age: true,
              avatar: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // Get thông tin bình luận theo id ảnh
  async getCommentByImageId(id: number) {
    try {
      const data = await this.prisma.image.findUnique({
        where: {
          image_id: id,
        },
        include: {
          comment: true,
        },
      });
      return data;
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // POST thêm ảnh, post ảnh mới theo user_id
  async postImage(
    token: string,
    file: Express.Multer.File,
    description: string,
  ) {
    const decodedToken = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if (!user_id) {
      throw new UnauthorizedException('Invalid Token');
    }
    const image_name = file.filename;
    const link = '/public/img/' + file.filename;
    let data = await this.prisma.image.create({
      data: {
        image_name,
        link,
        description,
        user_id,
      },
    });

    return { message: 'Post image successfully!', data };
  }

  // DELETE ảnh theo user_id và image_id
  async deleteImage(token: string, image_id: number) {
    const decodedToken = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if (!user_id) {
      throw new UnauthorizedException('Invalid Token');
    }
    const checkOwner = await this.prisma.image.findUnique({
      where: {
        user_id,
        image_id,
      },
    });
    if (checkOwner) {
      await this.prisma.image.delete({
        where: {
          user_id,
          image_id,
        },
      });
      return { message: 'Image deleted successfully.' };
    } else {
      return { message: "You don't have permission to delete this image" };
    }
  }
}
