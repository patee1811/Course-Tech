// src/course/course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseContent } from './course-content.entity';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { User } from '../user/user.entity';

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

  findAll(): Promise<Course[]> {
    return this.courseRepo.find({ relations: ['teacher'] });
  }

  searchByTitle(title: string): Promise<Course[]> {
    return this.courseRepo.find({
      where: { title: ILike(`%${title}%`) },
      relations: ['teacher'],
    });
  }

  async updateCourse(id: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    if (dto.teacherId) {
      const teacher = await this.userRepo.findOneBy({ id: dto.teacherId });
      if (!teacher) throw new NotFoundException(`Teacher #${dto.teacherId} not found`);
      course.teacher = teacher;
    }
    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async removeCourse(id: number): Promise<void> {
    const result = await this.courseRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course #${id} not found`);
    }
  }

  async updateContent(id: number, dto: UpdateCourseContentDto): Promise<CourseContent> {
    const content = await this.contentRepo.findOneBy({ id });
    if (!content) throw new NotFoundException(`Content #${id} not found`);
    Object.assign(content, dto);
    return this.contentRepo.save(content);
  }

  async removeContent(id: number): Promise<void> {
    const result = await this.contentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content #${id} not found`);
    }
  }
}
