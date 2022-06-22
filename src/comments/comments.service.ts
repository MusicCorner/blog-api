import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddCommentDto } from '@posts/dto/add-comment.dto';

import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>
  ) {}

  async edit({ content }: AddCommentDto, commentId: string, userId: string) {
    const commentEntity = await this.commentsRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });

    if (!commentEntity) {
      throw new Error('no such comment');
    }

    commentEntity.content = content;

    return Comment.save(commentEntity);
  }

  async delete(commentId: string, userId: string) {
    const commentEntity = await this.commentsRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });

    if (!commentEntity) {
      throw new Error('no such comment');
    }

    return commentEntity.softRemove();
  }
}
