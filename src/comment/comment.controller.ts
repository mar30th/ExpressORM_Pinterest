import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostComment } from './comment.entity/comment.entity';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}

    @Get()
    async getComment() {
        return this.commentService.getComment();
    }

    @Post('/post_comment')
    async postComment(@Body() comment: PostComment) {
        return this.commentService.postComment(comment);
    }
}
