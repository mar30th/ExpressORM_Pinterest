import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from './user.dto/user-update.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Headers('Authorization') token: string) {
    return this.userService.getUser();
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string, @Headers('Authorization') token: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get('/id/:user_id')
  async getUserById(@Param('user_id', ParseIntPipe) user_id: number, @Headers('Authorization') token: string) {
    return this.userService.getUserById(user_id);
  }

  @Get('/saved-image/:image_id')
  async getSavedImageById(@Param('image_id', ParseIntPipe) image_id: number) {
    return this.userService.getSavedImageByUserId(image_id);
  }

  @Get('/image-created-by/')
  async getImageCreatedByUserId(
    @Headers('Authorization') token: string,
  ) {
    return this.userService.getImageCreatedByUserId(token);
  }

  @Post('/update-user/')
  async updateUser(
    @Headers('Authorization') token: string,
    @Body() data: UserUpdateDto,
  ) {
    return this.userService.postUpdateUser(token, data);
  }
}
