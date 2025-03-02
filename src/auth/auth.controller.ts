import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressReqeust } from 'express';

import { UsersService } from '@users/users.service';

import { Auth } from './auth.entity';
import { AuthRegistrationDto } from './dto/auth.register-dto';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guard/auth.local-guard';
import { AuthJwtGuard } from './guard/auth.jwt-guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(AuthLocalGuard)
  @Post('/auth/signin')
  signIn(@Request() req: ExpressReqeust) {
    return this.authService.login(req.user as Auth);
  }

  @UseGuards(AuthJwtGuard)
  @Get('/auth/check')
  async getSelfData(@Request() req: ExpressReqeust) {
    const { id } = (req.user || {}) as Auth;

    try {
      return await this.usersService.getById({ id });
    } catch (error) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post('/auth/signup')
  async signUp(@Body() body: AuthRegistrationDto) {
    try {
      return await this.authService.registerUser(body);
    } catch (_error) {
      const error = _error as { code: string };

      if (error.code === '23505') {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException('Something went wrong', HttpStatus.CONFLICT);
    }
  }
}
