import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@users/user.entity';
import { Post } from '@posts/post.entity';

@Entity()
export class PostsUsersVotes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  vote: number;

  @ManyToOne((_type) => User, (user) => user.postsUsersVotes, {
    cascade: true,
  })
  // @JoinTable()
  user: User;

  @ManyToOne((_type) => Post, (post) => post.postsUsersVotes, {
    cascade: true,
  })
  // @JoinTable()
  post: Post;
}
