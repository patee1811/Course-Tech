import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Course } from '../course/course.entity';
import { Enrollment } from '../course/enrollment.entity';
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
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

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  @BeforeUpdate()
  async hashPasswordOnUpdate() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
} 
