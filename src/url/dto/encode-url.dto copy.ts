import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EncodeUrlDto {
  @ApiProperty({
    example: 'https:www.google.com',
    description: 'The Url',
  })
  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
