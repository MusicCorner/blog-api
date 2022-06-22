import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostsUsersVotes } from '@postsUsersVotes/postsUsersVotes.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: '' })
  nickname?: string;

  @OneToMany(
    () => PostsUsersVotes,
    (postsUsersVotes) => postsUsersVotes.user
    // { cascade: true }
  )
  postsUsersVotes: PostsUsersVotes;
}
