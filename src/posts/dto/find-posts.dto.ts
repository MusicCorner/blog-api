import { PartialCommonGetFilter } from '@common/types/filter';

export interface FindPostsDto extends PartialCommonGetFilter {
  userId?: string;
  keywords?: string;
}
