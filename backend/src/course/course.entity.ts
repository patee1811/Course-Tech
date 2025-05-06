import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
    ManyToOne, OneToMany
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { CourseContent } from './course-content.entity';
  
  @Entity('courses')
  export class Course {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column('text')
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @ManyToOne(() => User, user => user.courses, { eager: true, onDelete: 'CASCADE' })
    teacher: User;
  
    @OneToMany(() => CourseContent, content => content.course, { cascade: true })
    contents: CourseContent[];
  }
  