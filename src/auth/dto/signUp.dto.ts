import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'Ulises',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
