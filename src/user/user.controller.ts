import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserUpdate } from './user.entity/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Headers('token') token) {
    return this.userService.getUser();
  }

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string, @Headers('token') token) {
    return this.userService.getUserByEmail(email);
  }

  @Get('/id/savedimage/:image_id')
  async getSavedImageById(@Param('image_id', ParseIntPipe) image_id: number) {
    return this.userService.getSavedImageByUserId(image_id);
  }

  @Get('/image-created-by/:user_id')
  async getImageCreatedByUserId(
    @Headers('token') token,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    return this.userService.getImageCreatedByUserId(user_id);
  }

  @Post('/update-user/')
  async updateUser(
    @Headers('Authorization') token: string,
    @Body() data: UserUpdate,
  ) {
    return this.userService.postUpdateUser(token, data);
  }
}
