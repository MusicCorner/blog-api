import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseExtendedEntity } from '@common/entities/baseExtendedEntity';
import { Post } from '@posts/post.entity';
import { User } from '@users/user.entity';

@Entity()
export class Comment extends BaseExtendedEntity {
  @Column()
  content: string;

  @ManyToOne((_type) => Post)
  post: Post;

  @JoinColumn()
  @ManyToOne((_type) => User)
  user: User;
}
