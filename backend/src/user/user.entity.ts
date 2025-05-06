import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../course/course.entity';
import { Enrollment } from '../course/enrollment.entity';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: 0 })
  completed_courses_count: number;

  @Column({ default: 0 })
  certificates_count: number;

  @OneToMany(() => Course, course => course.teacher)
  teachingCourses: Course[];

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[];
}
