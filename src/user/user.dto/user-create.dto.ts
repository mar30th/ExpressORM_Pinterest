import { ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from 'src/image/image.dto/file-upload-image.dto.ts';

export class UserCreateDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  age: number;
}



