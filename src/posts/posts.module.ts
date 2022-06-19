import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@users/user.entity';

import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
