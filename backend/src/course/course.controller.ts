import {
  Controller, Post, Body, Get, Param, Query,
  Patch, Delete, ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Post('content')
  addContent(@Body() dto: CreateCourseContentDto) {
    return this.courseService.addContent(dto);
  }

  @Get()
  getAll(@Query('title') title?: string) {
    if (title) {
      return this.courseService.searchByTitle(title);
    }
    return this.courseService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getCourseWithContents(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.removeCourse(id);
  }

  @Patch('content/:id')
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseContentDto,
  ) {
    return this.courseService.updateContent(id, dto);
  }

  @Delete('content/:id')
  removeContent(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.removeContent(id);
  }

  @Post('quiz')
  createQuiz(@Body() dto: CreateQuizDto) {
    return this.courseService.createQuiz(dto);
  }

  @Post('quiz/question')
  addQuestion(@Body() dto: CreateQuestionDto) {
    return this.courseService.addQuestion(dto);
  }

  @Get('quiz/:id')
  getQuiz(@Param('id') id: number) {
    return this.courseService.getQuizWithQuestions(id);
  }
}
