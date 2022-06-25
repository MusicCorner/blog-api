import { Controller, Get, Param, Query } from '@nestjs/common';

import { PartialCommonGetFilter } from '@common/types/filter';
import { PostsService } from '@posts/posts.service';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  @Get()
  get(@Query() filter: PartialCommonGetFilter) {
    return this.usersService.get(filter);
  }

  @Get(':userId/posts')
  getPosts(
    @Query() filter: PartialCommonGetFilter,
    @Param('userId') userId: string
  ) {
    return this.postsService.get({ ...filter, userId });
  }
}
