import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    const userAuthData = await this.authService.validateUser({
      login,
      password,
    });

    if (!userAuthData) {
      throw new UnauthorizedException();
    }

    return userAuthData.user;
  }
}
