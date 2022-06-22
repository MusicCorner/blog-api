import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@posts/post.entity';
import { PostsService } from '@posts/posts.service';
import { PostsUsersVotes } from '@posts-users-votes/posts-users-votes.entity';
import { PostsUsersVotesService } from '@posts-users-votes/posts-users-votes.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, PostsUsersVotes])],
  providers: [UsersService, PostsService, PostsUsersVotesService],
  controllers: [UsersController],
})
export class UsersModule {}
