import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.google.com.mx/?hl=es',
    description: 'The URL',
  })
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ade4d',
    description: 'The short URL',
  })
  readonly shortUrl: string;
}
