import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from '@users/user.entity';

import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.local-strategy';
import { AuthJwtStrategy } from './auth.jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Auth, User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthJwtStrategy],
})
export class AuthModule {}
