// src/forum/dto/create-post.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsString() @IsNotEmpty()
  body: string;

  @IsInt()
  authorId: number;
}
