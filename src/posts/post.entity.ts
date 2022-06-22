import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '@users/user.entity';
import { PostsUsersVotes } from '@posts-users-votes/posts-users-votes.entity';
import { BaseExtendedEntity } from '@common/entities/baseExtendedEntity';

@Entity()
export class Post extends BaseExtendedEntity {
  @ManyToOne((_type) => User)
  @JoinColumn()
  user: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  dislikes?: number;

  @OneToMany(() => PostsUsersVotes, (postsUsersVotes) => postsUsersVotes.post)
  postsUsersVotes: PostsUsersVotes;
}
