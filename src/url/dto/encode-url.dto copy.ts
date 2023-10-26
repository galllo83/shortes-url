import { IsNotEmpty, IsString } from 'class-validator';

export class EncodeUrlDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
