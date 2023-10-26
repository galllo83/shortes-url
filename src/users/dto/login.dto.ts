import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'name',
    description: 'The name',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'The password',
  })
  readonly password: string;
}
