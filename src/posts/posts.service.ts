import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/user.entity';

import { CreatePostDto } from './create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(post: CreatePostDto, userId: string) {
    const userEntity = await this.usersRepository.findOne({
      where: { id: userId },
    });

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

  findAll(userId: string) {
    return this.postsRepository.find({ where: { user: { id: userId } } });
  }
}
