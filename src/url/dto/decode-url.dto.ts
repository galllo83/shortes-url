import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DecodeUrlDto {
  @ApiProperty({
    example: 'InR5cC',
    description: 'The shortened Url code',
  })
  @IsString()
  @IsNotEmpty()
  readonly shortUrl: string;
}
