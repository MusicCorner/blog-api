import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/user.entity';
import { PartialCommonGetFilter } from '@common/types/filter';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
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

    if (!userEntity) {
      throw new Error('no such user');
    }

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

    postEntity.remove();

    return true;
  }

  // async vote(userId: string, voteType: 'like' | 'dislike') {

  // }

  async findAll(userId: string, filter: PartialCommonGetFilter) {
    const { page = 1, onPage = 10, sortBy = 'createdAt', sort } = filter;
    const skip = (page - 1) * onPage;
    const take = onPage;

    const basicQueryParams = {
      where: { user: { id: userId } },
    };

    const posts = await this.postsRepository.find({
      ...basicQueryParams,
      skip,
      take,
      order: { [sortBy]: sort },
    });

    const count = await this.postsRepository.count(basicQueryParams);
    const pagesCount = count < onPage ? 1 : +(count / onPage).toFixed();

    return {
      data: posts,
      count,
      pagesCount,
      onPage: +onPage,
      page: +page,
    };
  }
}
