import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@users/user.entity';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((_type) => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;
}
