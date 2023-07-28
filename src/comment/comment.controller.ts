import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostComment } from './comment.entity/comment.entity';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard("jwt"))
@Controller('comment')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}

    @Get()
    async getComment(@Headers("Authorization") token: string) {
        return this.commentService.getComment();
    }

    @Post('/post_comment')
    async postComment(@Headers("Authorization") token: string, @Body() comment: PostComment) {
        return this.commentService.postComment(token, comment);
    }
}
