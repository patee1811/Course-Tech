// src/course/course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Course } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseContent } from './course-content.entity';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { User } from '../user/user.entity';
import { Quiz } from './entity/quiz.entity';
import { Question } from './entity/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CourseContent) private contentRepo: Repository<CourseContent>,
    @InjectRepository(Quiz) private quizRepo: Repository<Quiz>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
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

  async createQuiz(dto: CreateQuizDto) {
    const course = await this.courseRepo.findOneBy({ id: dto.courseId });
    if (!course) throw new NotFoundException('Course not found');

    const quiz = this.quizRepo.create({
      title: dto.title,
      course,
    });

    return this.quizRepo.save(quiz);
  }

  async addQuestion(dto: CreateQuestionDto) {
    const quiz = await this.quizRepo.findOneBy({ id: dto.quizId });
    if (!quiz) throw new NotFoundException('Quiz not found');

    const question = this.questionRepo.create({
      ...dto,
      quiz,
    });

    return this.questionRepo.save(question);
  }

  async getQuizWithQuestions(quizId: number) {
    return this.quizRepo.findOne({
      where: { id: quizId },
      relations: ['questions'],
    });
  }
}
