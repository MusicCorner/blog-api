import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from '@users/user.entity';
import { BaseExtendedEntity } from '@common/entities/baseExtendedEntity';

@Entity()
export class Auth extends BaseExtendedEntity {
  @OneToOne((_type) => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;
}
