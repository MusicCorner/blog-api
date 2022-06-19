import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@users/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ default: new Date() })
  createdAt?: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
