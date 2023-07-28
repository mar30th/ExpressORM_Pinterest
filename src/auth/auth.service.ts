import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { UserEntity, UserLogin } from 'src/user/user.entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  // POST đăng ký tài khoản
  async signUp(newUser: UserEntity) {
    let { full_name, email, password, age, avatar } = newUser;
    let checkUser = await this.prisma.user.findMany({
      where: { email },
    });
    if (checkUser.length > 0) {
      return { success: false, message: "That email is taken. Try another." };
    } else {
      const dataUser = await this.prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
          full_name,
          age,
          avatar,
        },
      });
      return { success: true, message: dataUser };
    }
  }

  // POST đăng nhập tài khoản
  async signIn(userLogin: UserLogin) {
    let { email, password } = userLogin;
    let checkUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (checkUser) {
      if (bcrypt.compareSync(password, checkUser.password)) {
        const { password: passwordToRemove, ...dataRemovePass } = checkUser;
        let token = await this.jwtService.signAsync(
          { data: dataRemovePass },
          { secret: this.configService.get('KEY'), expiresIn: '30m' },
        );
        return {
          success: true,
          data: token,
          message: "Welcome back, Login successfully",
        };
      } else {
        return { success: false, message: "Wrong password, try again!" };
      }
    } else {
      return {
        success: false,
        message: "Couldn't find your Email account, please try again!",
      };
    }
  }
}
