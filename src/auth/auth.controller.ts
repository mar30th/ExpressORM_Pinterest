import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity, UserLogin } from 'src/user/user.entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: UserEntity) {
    return this.authService.signUp(user)
  }

  @Post('/login')
  async signIn(@Body() userLogin: UserLogin) {
    return this.authService.signIn(userLogin);
  }
}
