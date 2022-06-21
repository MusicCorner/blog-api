import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';

import { AuthJwtGuard } from '@auth/auth.jwt-guard';
import { AuthJwtVerificationResponse } from '@auth/auth.jwt-verification-response';

import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthJwtGuard)
  @Post()
  async create(
    @Request() req: ExpressRequest<unknown, unknown, CreatePostDto>,
    @Res() res: Response
  ) {
    const createPostDto = req.body;
    const user = req.user as AuthJwtVerificationResponse;

    try {
      const data = await this.postsService.create(createPostDto, user.id);

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED, data });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
