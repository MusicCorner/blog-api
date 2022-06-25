import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '@users/user.entity';
import { compareHashWithText, generateHash } from '@common/helpers/hash';

import { Auth } from './auth.entity';
import { AuthLoginDto } from './dto/auth.login-dto';
import { AuthRegistrationDto } from './dto/auth.register-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser({ login, password }: AuthLoginDto) {
    const user = await this.authRepository.findOne({
      where: { login },
      relations: ['user'],
    });

    if (!user) {
      throw new UnprocessableEntityException();
    }

    const isPasswordCorrect = await compareHashWithText(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException();
    }

    return user;
  }

  login(authData: Auth) {
    return {
      access_token: this.jwtService.sign({
        login: authData.login,
        id: authData.user.id,
      }),
    };
  }

  async registerUser(registrationData: AuthRegistrationDto) {
    const { login, password, email, firstName, lastName, nickname } =
      registrationData;

    const user = this.userRepository.create();

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.nickname = nickname;

    const auth = this.authRepository.create();

    auth.login = login;
    auth.password = await generateHash(password);
    auth.user = user;

    return this.authRepository.save(auth);
  }
}
