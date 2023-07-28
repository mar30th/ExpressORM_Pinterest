export class ImageEntity {
    image_id: number;
    image_name: string;
    link: string;
    description: string;
    user_id: number;
}

export class PostImage {
    image_name: string;
    link: string;
    description: string;
}

export class DeleteImage {
    user_id: number;
    image_id: number;
}
