import { Controller, Get, Param, Query } from '@nestjs/common';

import { PartialCommonGetFilter } from '@common/types/filter';
import { PostsService } from '@posts/posts.service';

@Controller('users')
export class UsersController {
  constructor(private postsService: PostsService) {}

  @Get(':userId/posts')
  getAllPosts(
    @Query() queryParams: PartialCommonGetFilter,
    @Param('userId') userId: string
  ) {
    return this.postsService.findAll({ ...queryParams, userId });
  }
}
