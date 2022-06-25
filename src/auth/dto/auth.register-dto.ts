import { IsNotEmpty } from 'class-validator';

export class AuthRegistrationDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  nickname?: string;

  @IsNotEmpty()
  email: string;
}
