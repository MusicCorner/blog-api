import { PartialCommonGetFilter } from '@common/types/filter';

export interface GetCommentsDto extends PartialCommonGetFilter {
  postId: string;
}
