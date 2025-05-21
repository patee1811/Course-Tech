import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  quizId: number;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  options: string[];

  @IsNotEmpty()
  correctAnswer: string;
}
