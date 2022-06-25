import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '@comments/comments.entity';
import { PostsUsersVotes } from '@posts-users-votes/posts-users-votes.entity';
import { PostsUsersVotesService } from '@posts-users-votes/posts-users-votes.service';
import { User } from '@users/user.entity';
import { CommonRepositoryService } from '@common/common-repository.service';

import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostsUsersVotes, Comment])],
  controllers: [PostsController],
  providers: [PostsService, PostsUsersVotesService, CommonRepositoryService],
})
export class PostsModule {}
