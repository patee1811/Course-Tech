import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
  } from 'typeorm';
  import { Course } from './course.entity';
  
  export enum ContentType {
    VIDEO = 'video',
    IMAGE = 'image',
    QUIZ = 'quiz'
  }
  
  @Entity('course_contents')
  export class CourseContent {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column({
      type: 'enum',
      enum: ContentType,
    })
    content_type: ContentType;
  
    @Column({ type: 'text', nullable: true })
    content_url: string;
  
    @Column({ type: 'int', default: 0 })
    sort_order: number;
  
    @ManyToOne(() => Course, course => course.contents, { onDelete: 'CASCADE' })
    course: Course;
  }
  