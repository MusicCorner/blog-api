import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsUsersVotes } from '@postsUsersVotes/postsUsersVotes.entity';
import { PostsUsersVotesService } from '@postsUsersVotes/postsUsersVotes.service';
import { User } from '@users/user.entity';

import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostsUsersVotes])],
  controllers: [PostsController],
  providers: [PostsService, PostsUsersVotesService],
})
export class PostsModule {}
