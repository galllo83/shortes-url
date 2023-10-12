import { IsString, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
