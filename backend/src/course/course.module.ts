import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseContent } from './course-content.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseContent, User])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
