import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
// import { UserService } from './user/user.service';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { SaveImageModule } from './save_image/save_image.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    ImageModule,
    CommentModule,
    SaveImageModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ secret: 'KEY', signOptions: { expiresIn: '30m' } }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, UserService],
})
export class AppModule {}