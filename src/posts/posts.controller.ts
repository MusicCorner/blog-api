import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthJwtGuard } from '@auth/guard/auth.jwt-guard';
import { ExpressRequestWithJWTUser } from '@common/types/express';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthJwtGuard)
  @Post()
  async create(
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, CreatePostDto>,
    @Res() res: Response
  ) {
    const {
      body: postDto,
      user: { id: userId },
    } = req;

    try {
      const data = await this.postsService.create(postDto, userId || '');

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED, data });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthJwtGuard)
  @Delete(':postId')
  async delete(
    @Request() req: ExpressRequestWithJWTUser,
    @Res() res: Response,
    @Param('postId') postId: string
  ) {
    const {
      user: { id: userId },
    } = req;
    await this.postsService.delete(userId, postId);

    res.status(HttpStatus.OK).send({ status: HttpStatus.OK, postId });
  }

  @UseGuards(AuthJwtGuard)
  @Put(':postId')
  async edit(
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, CreatePostDto>,
    @Res() res: Response,
    @Param('postId') postId: string
  ) {
    const {
      body: postDto,
      user: { id: userId },
    } = req;

    const data = await this.postsService.edit(postDto, userId, postId);

    res.status(HttpStatus.OK).send({ status: HttpStatus.OK, data });
  }
}
