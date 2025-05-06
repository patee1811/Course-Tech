import { IsEnum, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ContentType } from '../course-content.entity';

export class CreateCourseContentDto {
  @IsNotEmpty()
  title: string;

  @IsEnum(ContentType)
  content_type: ContentType;

  @IsOptional()
  content_url?: string;

  @IsOptional()
  @IsInt()
  sort_order?: number;

  @IsNotEmpty()
  courseId: number;
}
