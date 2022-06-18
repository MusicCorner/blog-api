import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async create(post: CreatePostDto) {
    const postEntity = Post.create();

    postEntity.content = post.content;
    postEntity.title = post.title;

    await Post.save(postEntity);

    return postEntity;
  }

  findAll() {
    return this.postsRepository.find();
  }
}
