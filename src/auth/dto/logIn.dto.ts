import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LogInDto {
  @ApiProperty({
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
