import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    // @Req() req: Request<unknown, unknown, unknown, { test: string }>
    // const queryParams = req.query;

    return this.postsService.findAll();
    // return [{ id: 1, text: 'test' }];
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    try {
      console.log(createPostDto);
      await this.postsService.create(createPostDto);

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Something went wrong',
      });
    }
  }
}
