import { IsNotEmpty, IsString } from 'class-validator';

export class DecodeUrlDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
