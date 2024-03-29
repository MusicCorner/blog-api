import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthJwtGuard } from '@auth/guard/auth.jwt-guard';
import { ExpressRequestWithJWTUser } from '@common/types/express';
import { PartialCommonGetFilter } from '@common/types/filter';

import { CreatePostDto, PostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { PostIdDto } from './dto/post-id.dto';
import { FindPostsDto } from './dto/find-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  get(@Query() queryParams: FindPostsDto) {
    return this.postsService.get(queryParams);
  }

  @UseGuards(AuthJwtGuard)
  @Post()
  async create(
    @Body() postDto: PostDto,
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, CreatePostDto>,
    @Res() res: Response
  ) {
    const {
      user: { id: userId },
    } = req;

    try {
      const data = await this.postsService.create(postDto, userId || '');

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED, data });
    } catch (error) {
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
    @Param() { postId }: PostIdDto
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
    @Body() postDto: CreatePostDto,
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, CreatePostDto>,
    @Res() res: Response,
    @Param('postId') postId: string
  ) {
    const {
      user: { id: userId },
    } = req;

    const data = await this.postsService.edit(postDto, userId, postId);

    res.status(HttpStatus.OK).send({ status: HttpStatus.OK, data });
  }

  @UseGuards(AuthJwtGuard)
  @Put(':postId/:voteType')
  async vote(
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, CreatePostDto>,
    @Res() res: Response,
    @Param() { postId, voteType }: PostIdDto & { voteType: 'like' | 'dislike' }
  ) {
    const {
      user: { id: userId },
    } = req;

    const data = await this.postsService.vote(voteType, userId, postId);

    res.status(HttpStatus.OK).send({ status: HttpStatus.OK, data });
  }

  @Get(':postId/comments')
  getComments(
    @Param() { postId }: PostIdDto,
    @Query() queryParams: PartialCommonGetFilter
  ) {
    return this.postsService.getComments({ ...queryParams, postId });
  }

  @UseGuards(AuthJwtGuard)
  @Post(':postId/comments')
  async addComment(
    @Param() { postId }: PostIdDto,
    @Body() createCommentDto: AddCommentDto,
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, AddCommentDto>,
    @Res() res: Response
  ) {
    const {
      user: { id: userId },
    } = req;

    try {
      const data = await this.postsService.addComment(
        createCommentDto,
        userId || '',
        postId
      );

      res.status(HttpStatus.CREATED).send({ status: HttpStatus.CREATED, data });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
