import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from 'src/user/user.dto/user-create.dto';
import { AuthLoginDto } from './auth.dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  // POST đăng ký tài khoản
  async signUp(newUser: UserCreateDto, avatar_file: Express.Multer.File) {
    try {
      let { full_name, email, password, age } = newUser;
      let avatar = '/public/avatar/' + avatar_file.filename;
      let checkUser = await this.prisma.user.findMany({
        where: { email },
      });
      if (checkUser.length > 0) {
        return { success: false, message: 'That email is taken. Try another.' };
      }
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const dataUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          full_name,
          age,
          avatar,
        },
        select: {
          email: true,
          full_name: true,
          age: true,
          avatar: true,
        },
      });
      return { success: true, message: dataUser };
    } catch (error) {
      return { message: 'Backend Error!' };
    }
  }

  // POST đăng nhập tài khoản
  async signIn(userLogin: AuthLoginDto) {
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
          message: 'Welcome back, Login successfully',
        };
      } else {
        return { success: false, message: 'Wrong password, try again!' };
      }
    } else {
      return {
        success: false,
        message: "Couldn't find your Email account, please try again!",
      };
    }
  }
}
