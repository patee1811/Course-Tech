import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { CourseContent } from '../course-content.entity';
import { Enrollment } from './enrollment.entity';
import { Quiz } from './quiz.entity';


@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.teachingCourses)
  teacher: User;

  @OneToMany(() => CourseContent, content => content.course)
  contents: CourseContent[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Quiz, quiz => quiz.course)
  quizzes: Quiz[];
}
