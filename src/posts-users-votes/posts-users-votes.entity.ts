import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '@users/user.entity';
import { Post } from '@posts/post.entity';
import { BaseExtendedEntity } from '@common/entities/baseExtendedEntity';

@Entity()
export class PostsUsersVotes extends BaseExtendedEntity {
  @Column({ default: 0 })
  vote: number;

  @ManyToOne((_type) => User, (user) => user.postsUsersVotes, {
    cascade: true,
  })
  user: User;

  @ManyToOne((_type) => Post, (post) => post.postsUsersVotes, {
    cascade: true,
  })
  post: Post;
}
