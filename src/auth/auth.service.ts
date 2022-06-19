import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '@users/user.entity';

import { Auth } from './auth.entity';
import { AuthLoginDto } from './auth.loginDto';
import { AuthRegistrationDto } from './auth.registerDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  validateUser(authData: AuthLoginDto) {
    return this.authRepository.findOne({
      where: authData,
      relations: ['user'],
    });
  }

  login(authData: Auth) {
    return {
      access_token: this.jwtService.sign({
        login: authData.login,
        id: authData.user.id,
      }),
    };
  }

  registerUser(registrationData: AuthRegistrationDto) {
    const { login, password, email, firstName, lastName, nickname } =
      registrationData;

    const user = this.userRepository.create();

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.nickname = nickname;

    const auth = this.authRepository.create();

    auth.login = login;
    auth.password = password;
    auth.user = user;

    return this.authRepository.save(auth);
  }
}
