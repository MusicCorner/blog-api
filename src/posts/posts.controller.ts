import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthJwtGuard } from '@auth/auth.jwt-guard';

import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthJwtGuard)
  @Get()
  getAllPosts() {
    // @Req() req: Request<unknown, unknown, unknown, { test: string }>
    // const queryParams = req.query;

    return this.postsService.findAll();
  }

  @UseGuards(AuthJwtGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    try {
      await this.postsService.create(createPostDto);

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
