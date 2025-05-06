import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../user/user.entity';
import { CourseContent } from './course-content.entity';
import { CreateCourseContentDto } from './dto/create-course-content.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CourseContent) private contentRepo: Repository<CourseContent>,
  ) {}

  async createCourse(dto: CreateCourseDto) {
    const teacher = await this.userRepo.findOneBy({ id: dto.teacherId });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const course = this.courseRepo.create({
      title: dto.title,
      description: dto.description,
      teacher,
    });

    return this.courseRepo.save(course);
  }

  async addContent(dto: CreateCourseContentDto) {
    const course = await this.courseRepo.findOneBy({ id: dto.courseId });
    if (!course) throw new NotFoundException('Course not found');

    const content = this.contentRepo.create({
      ...dto,
      course,
    });

    return this.contentRepo.save(content);
  }

  async getCourseWithContents(courseId: number) {
    return this.courseRepo.findOne({
      where: { id: courseId },
      relations: ['contents'],
    });
  }
}
