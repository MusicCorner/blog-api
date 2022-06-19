import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@users/user.entity';

import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.local.strategy';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Auth, User]), PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
