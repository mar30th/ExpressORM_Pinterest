import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserUpdateDto } from './user.dto/user-update.dto.js';


@Injectable()
export class UserService {
  private prisma: PrismaClient;
  constructor(private readonly jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  // GET Thông tin user
  async getUser() {
    try {
      const data = await this.prisma.user.findMany({
        select: {
          user_id: true,
          email: true,
          full_name: true,
          age: true,
          avatar: true,
        },
      });
      return { message: 'Success', data };
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // // GET lấy thông tin user theo email
  async getUserByEmail(email: string) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      return { message: 'Success', data };
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // GET danh sách ảnh đã lưu theo user_id
  async getSavedImageByUserId(user_id: number) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          user_id,
        },
        select: {
          user_id: true,
          email: true,
          save_image: {
            select: {
              image_id: true,
              save_date: true,
            },
          },
        },
      });
      return { message: 'Success', data };
    } catch (error) {
      return { message: 'Backend Eror' };
    }
  }

  // GET danh sách ảnh đã tạo theo user_id
  async getImageCreatedByUserId(user_id: number) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          user_id,
        },
        select: {
          user_id: true,
          email: true,
          image: {
            select: {
              image_id: true,
              image_name: true,
              link: true,
              description: true,
            },
          },
        },
      });
      return { message: 'Success', data };
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

  // POST cập nhật thông tin user
  async postUpdateUser(token: string, data: UserUpdateDto) {
    try {
      const decodedToken = this.jwtService.decode(
        token.replace('Bearer ', ''),
      ) as any;
      const user_id = decodedToken?.data?.user_id;
      if (!user_id) {
        throw new UnauthorizedException('Invalid Token');
      } else {
        const { email, age, full_name } = data;
        await this.prisma.user.update({
          where: {
            user_id,
          },
          data: {
            email,
            age,
            full_name
          },
        });
        return { message: 'User updated!', dataUpdated: data };
      }
    } catch (error) {
      return { message: 'Backend Error' };
    }
  }

}
