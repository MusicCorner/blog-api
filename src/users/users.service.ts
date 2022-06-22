import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { FindUsersDto } from './dto/find-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async findAll(filter: FindUsersDto) {
    const {
      page = 1,
      onPage = 10,
      sortBy = 'createdAt',
      sort,
      keywords = '',
    } = filter;
    const skip = (page - 1) * onPage;
    const take = onPage;

    const whereParam = [
      { nickname: Like(`%${keywords.toLowerCase()}%`) },
      { firstName: Like(`%${keywords.toLowerCase()}%`) },
      { lastName: Like(`%${keywords.toLowerCase()}%`) },
    ];

    const data = await this.usersRepository.find({
      where: whereParam,
      skip,
      take,
      order: { [sortBy]: sort },
    });

    const count = await this.usersRepository.count({ where: whereParam });
    const pagesCount = count < onPage ? 1 : +(count / onPage).toFixed();

    return {
      data,
      count,
      pagesCount,
      onPage: +onPage,
      page: +page,
    };
  }
}
