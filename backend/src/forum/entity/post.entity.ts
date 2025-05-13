// src/forum/entities/post.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  author: User;

  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
