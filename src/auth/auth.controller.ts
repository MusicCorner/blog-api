import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressReqeust } from 'express';

import { Auth } from './auth.entity';
import { AuthLocalGuard } from './auth.local-guard';
import { AuthRegistrationDto } from './auth.registerDto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthLocalGuard)
  @Post('/auth/signin')
  signIn(@Request() req: ExpressReqeust) {
    return this.authService.login(req.user as Auth);
  }

  @Post('/auth/signup')
  async signUp(@Body() body: AuthRegistrationDto) {
    try {
      const authData = await this.authService.registerUser(body);

      return authData.user;
    } catch (_error) {
      const error = _error as { code: string };

      if (error.code === '23505') {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException('Something went wrong', HttpStatus.CONFLICT);
    }
  }
}
