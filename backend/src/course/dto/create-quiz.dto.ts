import { IsNotEmpty } from "class-validator";

export class CreateQuizDto {
  @IsNotEmpty()
  courseId: number;

  @IsNotEmpty()
  title: string;
}