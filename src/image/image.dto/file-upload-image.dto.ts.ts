import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty({ type: "string", format: "binary"})
    file_image: Express.Multer.File;
}