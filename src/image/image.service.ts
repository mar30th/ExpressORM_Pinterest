import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ImageEntity, PostImage } from './image.entity/image.entity';

@Injectable()
export class ImageService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Get danh sách ảnh về
  async getImage() {
    const data = await this.prisma.image.findMany();
    return data;
  }

  // Get tìm kiếm danh sách ảnh theo tên
  async getImageByName(name: string) {
    const data = await this.prisma.image.findMany({
      where: {
        image_name: {
          contains: name,
        },
      },
    });

    return data;
  }

  // Get thông tin ảnh và người tạo ảnh bằng ID ảnh
  async getImageInfoById(id: number) {
    const data = await this.prisma.image.findUnique({
      where: {
        image_id: id,
      },
      include: {
        user: {
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
    console.log(data);

    return data;
  }

  // Get thông tin bình luận theo id ảnh
  async getCommentByImageId(id: number) {
    const data = await this.prisma.image.findUnique({
      where: {
        image_id: id,
      },
      include: {
        comment: true,
      },
    });

    return data;
  }

  // Get thông tin đã lưa hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
  // Chưa xong, cần tạo token để lấy thêm thông tin từ user trong token
  async getSavedImageById(id: number) {
    const data = await this.prisma.image.findUnique({
      where: {
        image_id: id
      },
      include: {
        save_image: true
      }
    });
    
    return data;
  }


  // POST thêm ảnh, post ảnh mới
  async postImage(image: PostImage) {
    let {image_name, link, description, user_id} = image;
    let data = await this.prisma.image.create({
      data: {
        image_name,
        link,
        description,
        user_id
      }
    });
    return data

  }

  // DELETE xóa ảnh đã tạo theo ID ảnh
  async deleteImage(image_id: number) {
    const data = await this.prisma.image.delete({
      where: {
        image_id
      }
    })

    return data
  }

}
