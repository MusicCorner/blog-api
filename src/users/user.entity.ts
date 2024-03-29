import { Column, Entity, OneToMany } from 'typeorm';

import { PostsUsersVotes } from '@posts-users-votes/posts-users-votes.entity';
import { BaseExtendedEntity } from '@common/entities/baseExtendedEntity';

@Entity()
export class User extends BaseExtendedEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => PostsUsersVotes, (postsUsersVotes) => postsUsersVotes.user)
  postsUsersVotes: PostsUsersVotes;
}
