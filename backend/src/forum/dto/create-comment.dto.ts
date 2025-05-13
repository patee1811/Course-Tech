// src/forum/dto/create-comment.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString() @IsNotEmpty()
  text: string;

  @IsInt()
  postId: number;

  @IsInt()
  authorId: number;
}
