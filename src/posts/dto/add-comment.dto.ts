import { IsNotEmpty } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  content: string;
}
