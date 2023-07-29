import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CommentCreateDto } from './comment.dto/comment-create.dto';
import { CommentService } from './comment.service';

@ApiTags("Comment")
@UseGuards(AuthGuard("jwt"))
@Controller('comment')
export class CommentController {
    constructor (private readonly commentService: CommentService) {}

    @Get()
    async getComment(@Headers("Authorization") token: string) {
        return this.commentService.getComment();
    }

    @Post('/post_comment')
    async postComment(@Headers("Authorization") token: string, @Body() comment: CommentCreateDto) {
        return this.commentService.postComment(token, comment);
    }
}
