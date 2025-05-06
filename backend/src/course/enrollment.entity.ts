import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from './course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.enrollments)
  user: User;

  @ManyToOne(() => Course, course => course.enrollments)
  course: Course;

  @CreateDateColumn()
  enrolled_at: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  progress: number;

  @Column({ default: false })
  is_completed: boolean;
}
