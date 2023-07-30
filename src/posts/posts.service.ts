import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { User } from '@users/user.entity';
import { PostsUsersVotesService } from '@posts-users-votes/posts-users-votes.service';
import { Comment } from '@comments/comments.entity';
import { CommonRepositoryService } from '@common/common-repository.service';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { FindPostsDto } from './dto/find-posts.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { GetPostFormatted, GetPostRaw } from './post.types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsUsersVotesService: PostsUsersVotesService,
    private repositoryService: CommonRepositoryService
  ) {}

  private async _handleUserById(userId: string) {
    const userEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userEntity) {
      throw new Error('no such user');
    }

    return userEntity;
  }

  private async _handlePostByPostAndUserId(userId: string, postId: string) {
    const postEntity = await this.postsRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!postEntity) {
      throw new Error('no such post');
    }

    return postEntity;
  }

  private async _handlePostByPostId(postId: string) {
    const postEntity = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!postEntity) {
      throw new Error('no such post');
    }

    return postEntity;
  }

  async get(filter: FindPostsDto) {
    const { userId, ...restFilter } = filter;

    let where: undefined | any[] = [];

    if (restFilter.keywords) {
      where.push(
        {
          title: ILike(`%${restFilter.keywords}%`),
        },
        {
          content: ILike(`%${restFilter.keywords}%`),
        }
      );
    }

    if (userId) {
      where.push({ user: { id: userId } });
    }

    if (!where.length) {
      where = undefined;
    }

    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'postUser')
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select(
              'content AS comment_content, "postId", id AS comment_id, "userId"'
            )
            .from(Comment, 'comments')
            .limit(5),
        'comment',
        'comment."postId" = post.id'
      )
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select(
              `
              "firstName" as "comment_user_firstName",
              "lastName" as "comment_user_lastName",
              id as comment_user_id,
              email as comment_user_email,
              "createdAt" as "comment_user_createdAt"
              `
            )
            .from(User, 'user'),
        'comment_user',
        'comment_user.comment_user_id = comment."userId"'
      );

    if (where) {
      query.where(where);
    }

    const rawData = (await query.getRawMany()) as unknown as GetPostRaw[];

    const postsWithComments = rawData.reduce(
      (accum, post) => ({
        ...accum,
        [post.post_id]: {
          id: post.post_id,
          title: post.post_title,
          content: post.post_content,
          createdAt: post.post_createdAt,
          updatedAt: post.post_updatedAt,
          likes: post.post_likes,
          dislikes: post.post_dislikes,
          user: {
            firstName: post.postUser_firstName,
            lastName: post.postUser_firstName,
            id: post.postUser_id,
            email: post.postUser_email,
            createdAt: post.postUser_createdAt,
          },
          comments: [
            ...(accum?.[post.post_id as keyof typeof accum]?.comments || []),
            post.comment_id && {
              content: post.comment_content,
              id: post.comment_id,
              user: {
                id: post.comment_user_id,
                firstName: post.comment_user_firstName,
                lastName: post.comment_user_lastName,
                email: post.comment_user_email,
                createdAt: post.comment_user_createdAt,
              },
            },
          ].filter(Boolean),
        } as GetPostFormatted,
      }),
      {} as { [key: string]: GetPostFormatted }
    );

    const data = Object.values(postsWithComments);

    return { count: 10, data };
  }

  async create(post: CreatePostDto, userId: string) {
    const userEntity = await this._handleUserById(userId);

    const postEntity = this.postsRepository.create();

    postEntity.user = userEntity;
    postEntity.content = post.content;
    postEntity.title = post.title;

    await Post.save(postEntity);

    return postEntity;
  }

  async edit(post: CreatePostDto, userId: string, postId: string) {
    const postEntity = await this._handlePostByPostAndUserId(userId, postId);

    postEntity.content = post.content;
    postEntity.title = post.title;

    await Post.save(postEntity);

    return postEntity;
  }

  async delete(userId: string, postId: string) {
    const postEntity = await this._handlePostByPostAndUserId(userId, postId);

    postEntity.softRemove();

    return true;
  }

  async vote(voteType: 'like' | 'dislike', userId: string, postId: string) {
    const { dislike = 0, like = 0 } = await this.postsUsersVotesService.vote(
      voteType,
      userId,
      postId
    );

    const postEntity = await this._handlePostByPostId(postId);

    postEntity.dislikes = dislike + (postEntity.dislikes || 0);
    postEntity.likes = like + (postEntity.likes || 0);

    Post.save(postEntity);

    return postEntity;
  }

  async getComments(filter: GetCommentsDto) {
    const { postId, ...restFilter } = filter;

    const where = { post: { id: postId } };

    return this.repositoryService.findRepositoryDataWithCommonFilter(
      this.commentsRepository,
      restFilter,
      { where, relations: ['user'] }
    );
  }

  async addComment({ content }: AddCommentDto, userId: string, postId: string) {
    const commentEntity = this.commentsRepository.create();
    const userEntity = await this._handleUserById(userId);

    commentEntity.content = content;
    commentEntity.user = userEntity;

    const postEntity = await this._handlePostByPostId(postId);

    commentEntity.post = postEntity;

    return Comment.save(commentEntity);
  }
}
