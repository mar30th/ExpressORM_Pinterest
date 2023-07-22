import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { SaveImageModule } from './save_image/save_image.module';

@Module({
  imports: [UserModule, ImageModule, CommentModule, SaveImageModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
