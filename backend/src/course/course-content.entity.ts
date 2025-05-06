import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

export enum ContentType {
  VIDEO = 'video',
  QUIZ = 'quiz',
  IMAGE = 'image',
  PDF = 'pdf'
}

@Entity()
export class CourseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ContentType })
  content_type: ContentType;

  @Column('text')
  content_url: string;

  @Column({ default: 0 })
  sort_order: number;

  @ManyToOne(() => Course, course => course.contents)
  course: Course;
}
