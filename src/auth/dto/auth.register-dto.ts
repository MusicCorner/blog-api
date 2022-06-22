export interface AuthRegistrationDto {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  email: string;
}
