import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseContentDto } from './dto/create-course-content.dto';

@Controller('courses')
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

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.courseService.getCourseWithContents(id);
  }
}