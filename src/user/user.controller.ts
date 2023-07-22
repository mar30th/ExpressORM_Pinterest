import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserEntity, UserLogin, UserUpdate } from './user.entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ok')
  async getUser() {
    return this.userService.getUser();
  }

  @Get('/id/savedimage/:image_id')
  async getSavedImageById(@Param('image_id', ParseIntPipe) image_id: number) {
      return this.userService.getSavedImageByUserId(image_id)
  }

  @Get('/image-created-by/:user_id')
  async getImageCreatedByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
      return this.userService.getImageCreatedByUserId(user_id)
  }

  @Post('/login')
  async signIn(@Body() userLogin: UserLogin) {
    return this.userService.signIn(userLogin)
  }

  @Post('/signup')
  async signUp(@Body() user: UserEntity) {
    return this.userService.signUp(user)
  }

  @Post('/update-user/:user_id')
  async updateUser(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() data: UserUpdate,
  ) {
    return this.userService.postUpdateUser(user_id, data);
  }
}
