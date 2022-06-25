import { IsNotEmpty, IsOptional } from 'class-validator';

export interface PostDto {
  content: string;
  title: string;
}

export class CreatePostDto implements PostDto {
  @IsOptional()
  content: string;

  @IsNotEmpty()
  title: string;
}
