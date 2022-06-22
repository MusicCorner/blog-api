import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthJwtGuard } from '@auth/guard/auth.jwt-guard';
import { ExpressRequestWithJWTUser } from '@common/types/express';
import { AddCommentDto } from '@posts/dto/add-comment.dto';

import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthJwtGuard)
  @Put(':commentId')
  async edit(
    @Param('commentId') commentId: string,
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, AddCommentDto>,
    @Res() res: Response
  ) {
    const {
      body: createCommentDto,
      user: { id: userId },
    } = req;

    try {
      const data = await this.commentsService.edit(
        createCommentDto,
        commentId,
        userId
      );

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
  @Delete(':commentId')
  async delete(
    @Param('commentId') commentId: string,
    @Request() req: ExpressRequestWithJWTUser<unknown, unknown, AddCommentDto>,
    @Res() res: Response
  ) {
    const {
      user: { id: userId },
    } = req;

    try {
      const data = await this.commentsService.delete(commentId, userId);

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
