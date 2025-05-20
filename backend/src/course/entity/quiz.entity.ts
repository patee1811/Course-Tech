import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Question } from './question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, course => course.quizzes, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Question, question => question.quiz, { cascade: true })
  questions: Question[];
}
