import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, user => user.comments, { eager: true })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
