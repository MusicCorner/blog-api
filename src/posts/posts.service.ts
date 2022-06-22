import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { User } from '@users/user.entity';
import { PostsUsersVotesService } from '@posts-users-votes/posts-users-votes.service';
import { Comment } from '@comments/comments.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { FindPostsDto } from './dto/find-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(User)
    private commentsRepository: Repository<Comment>,
    private postsUsersVotesService: PostsUsersVotesService
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

  private async _handlePostById(userId: string, postId: string) {
    const postEntity = await this.postsRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!postEntity) {
      throw new Error('no such post');
    }

    return postEntity;
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
    const postEntity = await this._handlePostById(userId, postId);

    postEntity.content = post.content;
    postEntity.title = post.title;

    await Post.save(postEntity);

    return postEntity;
  }

  async delete(userId: string, postId: string) {
    const postEntity = await this._handlePostById(userId, postId);

    postEntity.softRemove();

    return true;
  }

  async vote(voteType: 'like' | 'dislike', userId: string, postId: string) {
    const { dislike = 0, like = 0 } = await this.postsUsersVotesService.vote(
      voteType,
      userId,
      postId
    );

    const postEntity = await this._handlePostById(userId, postId);

    postEntity.dislikes = dislike + (postEntity.dislikes || 0);
    postEntity.likes = like + (postEntity.likes || 0);

    Post.save(postEntity);

    return postEntity;
  }

  async addPostComment(content: string, userId: string, postId: string) {
    const commentEntity = this.commentsRepository.create();
    const userEntity = await this._handleUserById(userId);

    commentEntity.content = content;
    commentEntity.user = userEntity;

    const postEntity = await this._handlePostById(userId, postId);

    commentEntity.post = postEntity;

    return Comment.save(commentEntity);
  }

  async editPostComment(
    content: string,
    commentId: string,
    userId: string,
    postId: string
  ) {
    const commentEntity = await this.commentsRepository.findOne({
      where: { id: commentId, user: { id: userId }, post: { id: postId } },
    });

    if (!commentEntity) {
      throw new Error('no such comment');
    }

    commentEntity.content = content;

    return Comment.save(commentEntity);
  }

  async deletePostComment(commentId: string, userId: string, postId: string) {
    const commentEntity = await this.commentsRepository.findOne({
      where: { id: commentId, user: { id: userId }, post: { id: postId } },
    });

    if (!commentEntity) {
      throw new Error('no such comment');
    }

    return commentEntity.softRemove();
  }

  async findAll(filter: FindPostsDto) {
    const {
      page = 1,
      onPage = 10,
      sortBy = 'createdAt',
      sort,
      userId = '',
      keywords = '',
    } = filter;
    const skip = (page - 1) * onPage;
    const take = onPage;

    const whereParam = [
      { user: userId ? { id: userId } : {} },
      { title: Like(`%${keywords.toLowerCase()}%`) },
      { content: Like(`%${keywords.toLowerCase()}%`) },
    ];

    const data = await this.postsRepository.find({
      where: whereParam,
      skip,
      take,
      order: { [sortBy]: sort },
    });

    const count = await this.postsRepository.count({ where: whereParam });
    const pagesCount = count < onPage ? 1 : +(count / onPage).toFixed();

    return {
      data,
      count,
      pagesCount,
      onPage: +onPage,
      page: +page,
    };
  }
}
