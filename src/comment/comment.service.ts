import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PostComment } from './comment.entity/comment.entity';

@Injectable()
export class CommentService {
  private prisma: PrismaClient;

  constructor(private readonly jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  // Get danh sach comment
  async getComment() {
    const data = await this.prisma.comment.findMany();
    return data;
  }

  // POST để lưu thông tin bình luận của người dùng với hình ảnh
  async postComment(token: string, comment: PostComment) {
    const decodedToken = this.jwtService.decode(
      token.replace('Bearer ', ''),
    ) as any;
    const user_id = decodedToken?.data?.user_id;
    if (!user_id) {
      throw new UnauthorizedException('Invalid Token');
    }
    const { image_id, comment_content } = comment;
    const comment_date = new Date();

    const data = await this.prisma.comment.create({
      data: {
        user_id,
        image_id,
        comment_date,
        comment_content,
      },
    });
    return data;
  }
}
