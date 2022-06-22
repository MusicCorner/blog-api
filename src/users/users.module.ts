import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@posts/post.entity';
import { PostsService } from '@posts/posts.service';
import { PostsUsersVotes } from '@postsUsersVotes/postsUsersVotes.entity';
import { PostsUsersVotesService } from '@postsUsersVotes/postsUsersVotes.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, PostsUsersVotes])],
  providers: [UsersService, PostsService, PostsUsersVotesService],
  controllers: [UsersController],
})
export class UsersModule {}
