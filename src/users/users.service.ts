import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CommonRepositoryService } from '@common/common-repository.service';

import { FindUsersDto } from './dto/find-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private repositoryService: CommonRepositoryService
  ) {}

  async get(filter: FindUsersDto) {
    const where = filter.keywords
      ? [
          { nickname: ILike(`%${filter.keywords}%`) },
          { firstName: ILike(`%${filter.keywords}%`) },
          { lastName: ILike(`%${filter.keywords}%`) },
        ]
      : undefined;

    return this.repositoryService.findRepositoryDataWithCommonFilter(
      this.usersRepository,
      filter,
      { where }
    );
  }
}
