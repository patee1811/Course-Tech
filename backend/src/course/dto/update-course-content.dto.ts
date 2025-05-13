import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateCourseContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;
}
