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

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string, @Headers('Authorization') token: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get('/saved-image/:image_id')
  async getSavedImageById(@Param('image_id', ParseIntPipe) image_id: number) {
    return this.userService.getSavedImageByUserId(image_id);
  }

  @Get('/image-created-by/:user_id')
  async getImageCreatedByUserId(
    @Headers('Authorization') token: string,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    return this.userService.getImageCreatedByUserId(user_id);
  }

  @Post('/update-user/')
  async updateUser(
    @Headers('Authorization') token: string,
    @Body() data: UserUpdateDto,
  ) {
    return this.userService.postUpdateUser(token, data);
  }
}
