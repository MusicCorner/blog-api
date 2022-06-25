import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@posts/post.entity';
import { PostsService } from '@posts/posts.service';
import { PostsUsersVotes } from '@posts-users-votes/posts-users-votes.entity';
import { PostsUsersVotesService } from '@posts-users-votes/posts-users-votes.service';
import { Comment } from '@comments/comments.entity';
import { CommonRepositoryService } from '@common/common-repository.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, PostsUsersVotes, Comment])],
  providers: [
    UsersService,
    PostsService,
    PostsUsersVotesService,
    CommonRepositoryService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
