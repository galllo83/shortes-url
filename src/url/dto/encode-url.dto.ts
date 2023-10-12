import { IsNotEmpty, IsUrl } from 'class-validator';

export class EncodeUrlDto {
  @IsUrl()
  @IsNotEmpty()
  readonly url: string;
}
