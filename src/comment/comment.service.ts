import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostComment } from './comment.entity/comment.entity';

@Injectable()
export class CommentService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // Get danh sach comment
    async getComment() {
        const data = await this.prisma.comment.findMany();
        return data;
    }

    // POST để lưu thông tin bình luận của người dùng với hình ảnh
    async postComment(comment: PostComment) {
        const { user_id, image_id, comment_content } = comment;
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
