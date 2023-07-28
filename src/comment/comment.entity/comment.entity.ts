export class CommentEntity {
    comment_id: string;
    user_id: number;
    image_id: number;
    comment_date: string;
    comment_content: string
}

export class PostComment {
    image_id: number;
    comment_content: string
}