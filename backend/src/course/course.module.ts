import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { CourseContent } from './course-content.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User } from '../user/user.entity';
import { Enrollment } from './entity/enrollment.entity'
import { Quiz } from './entity/quiz.entity';
import { Question } from './entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseContent, User, Enrollment, Quiz, Question])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
