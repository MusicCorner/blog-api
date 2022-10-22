import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOptionsOrder,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { PartialCommonGetFilter } from '@common/types/filter';

@Injectable()
export class CommonRepositoryService {
  async findRepositoryDataWithCommonFilter<R extends ObjectLiteral>(
    repository: Repository<R>,
    filter: PartialCommonGetFilter,
    findOptions?: FindManyOptions<R>
  ) {
    const { page = 1, onPage = 10, sortBy = 'createdAt', sort } = filter;
    const skip = (page - 1) * onPage;
    const take = onPage;

    const data = await repository.find({
      skip,
      take,
      order: { [sortBy]: sort } as FindOptionsOrder<R>,
      ...findOptions,
    });

    const count = await repository.count({ where: findOptions?.where });
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
