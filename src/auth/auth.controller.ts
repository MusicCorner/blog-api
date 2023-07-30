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
import { AuthRegistrationDto } from './dto/auth.register-dto';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guard/auth.local-guard';

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
