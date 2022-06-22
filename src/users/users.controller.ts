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
  getUsers(@Query() filter: PartialCommonGetFilter) {
    return this.usersService.findAll(filter);
  }

  @Get(':userId/posts')
  getAllPosts(
    @Query() filter: PartialCommonGetFilter,
    @Param('userId') userId: string
  ) {
    return this.postsService.findAll({ ...filter, userId });
  }
}
