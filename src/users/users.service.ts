import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CommonRepositoryService } from '@common/common-repository.service';

import { FindUserByIdDto, FindUsersDto } from './dto/find-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private repositoryService: CommonRepositoryService
  ) {}

  async getById(filter: FindUserByIdDto) {
    const where = [{ id: filter.id }];

    const users =
      await this.repositoryService.findRepositoryDataWithCommonFilter(
        this.usersRepository,
        undefined,
        { where }
      );

    return users.data[0];
  }

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
