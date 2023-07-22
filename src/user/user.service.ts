import { Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { UserEntity, UserLogin, UserUpdate } from './user.entity/user.entity';
import { failCode, successCode } from '../config/response.js';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // GET Thông tin user
  async getUser() {
    const data = await this.prisma.user.findMany({
      select: {
        user_id: true,
        email: true,
        full_name: true,
        age: true,
        avatar: true,
      },
    });
    return data;
  }

  // POST đăng ký tài khoản
  async signUp(newUser: UserEntity) {
    // let {full_name, email, password}
    let { full_name, email, password, age, avatar } = newUser;
    let checkUser = await this.prisma.user.findMany({
      where: { email },
    });
    if (checkUser.length > 0) {
      return { success: false, message: 'Email da ton tai' };
    } else {
      //yarn add bcrypt
      await this.prisma.user.create({
        data: {
          email,
          password,
          full_name,
          age,
          avatar,
        },
      });
      return { success: true, message: newUser };
    }
  }

  // POST đăng nhập tài khoản
  async signIn(userLogin: UserLogin) {
    let { email, password } = userLogin;
    let checkUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (checkUser) {
      // Login thành công
      if (checkUser.password === password) {
        // Remove password before sending user data
        const { password, ...userWithoutPassword } = checkUser;
        return { success: true, data: userWithoutPassword };
      } else {
        return { success: false, message: 'Mật khẩu không đúng' };
      }
    } else {
      return { success: false, message: 'Email không tồn tại' };
    }
  }

  // GET danh sách ảnh đã lưu theo user_id
  async getSavedImageByUserId(user_id: number) {
    const data = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
      include: {
        save_image: true,
      },
    });

    return data;
  }

  // GET danh sách ảnh đã tạo theo user_id
  async getImageCreatedByUserId(user_id: number) {
    const data = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
      include: {
        image: true,
      },
    });

    return data;
  }

  // POST cập nhật thông tin user
  async postUpdateUser(user_id: number, data: UserUpdate) {
    // let {email, full_name, age, avatar} = data;
    const updatedUser = await this.prisma.user.update({
      where: {user_id}, data,
    });
    return updatedUser
  }
}
