import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({description: "email", type: String})
  email: string;

  @ApiProperty({description: "password", type: String})
  password: string;
}
