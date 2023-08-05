import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/image/image.dto/file-upload-image.dto.ts';
import { UserCreateDto } from 'src/user/user.dto/user-create.dto';
import { AuthLoginDto } from './auth.dto/auth-login.dto';
import { AuthService } from './auth.service';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConsumes("multipart/form-data")
  @ApiBody({type: FileUploadDto})
  @UseInterceptors(FileInterceptor("file_avatar", {
    storage: diskStorage({
      destination: process.cwd() + "/public/avatar",
      filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
    })
  }))
  @Post('/signup')
  async signUp(@Body() user: UserCreateDto, @UploadedFile() avatar: Express.Multer.File) {
    typeof user.age === 'string'? user.age = parseInt(user.age) : user.age
    return this.authService.signUp(user, avatar)
  }

  @Post('/login')
  async signIn(@Body() userLogin: AuthLoginDto) {
    return this.authService.signIn(userLogin);
  }

  @Post('test')
  async test(@Body() user) {
    return user;
  }
}
