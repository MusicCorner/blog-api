import { PartialCommonGetFilter } from '@common/types/filter';

export interface FindUsersDto extends PartialCommonGetFilter {
  keywords?: string;
}

export interface FindUserByIdDto {
  id: string;
}
