import { IsNotEmpty } from 'class-validator';

export class PostIdDto {
  @IsNotEmpty()
  postId: string;
}
