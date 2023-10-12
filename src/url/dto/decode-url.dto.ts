import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DecodeUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.google.com.mx/?hl=es',
    description: 'The URL',
  })
  readonly url: string;
}
