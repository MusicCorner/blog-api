import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@posts/post.entity';
import { PostsService } from '@posts/posts.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UsersService, PostsService],
  controllers: [UsersController],
})
export class UsersModule {}
