import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
