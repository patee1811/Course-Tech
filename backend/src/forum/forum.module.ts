// src/forum/forum.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { Post } from './entity/post.entity';
import { Comment } from './entity/comment.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, User]),
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
