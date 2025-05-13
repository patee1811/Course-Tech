// src/forum/forum.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { User } from '../user/user.entity';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // POSTS

  async createPost(dto: CreatePostDto) {
    const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
    if (!author) throw new NotFoundException('Author not found');
    const post = this.postRepo.create({ ...dto, author });
    return this.postRepo.save(post);
  }

  findAllPosts(search?: string) {
    if (search) {
      return this.postRepo.find({
        where: [{ title: ILike(`%${search}%`) }, { body: ILike(`%${search}%`) }],
        relations: ['comments']
      });
    }
    return this.postRepo.find({ relations: ['comments'] });
  }

  async findOnePost(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['comments']
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async updatePost(id: number, dto: UpdatePostDto) {
    const post = await this.findOnePost(id);
    Object.assign(post, dto);
    return this.postRepo.save(post);
  }

  async removePost(id: number) {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Post not found');
  }

  // COMMENTS

  async addComment(dto: CreateCommentDto) {
    const post = await this.findOnePost(dto.postId);
    const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
    if (!author) throw new NotFoundException('Author not found');
    const comment = this.commentRepo.create({ text: dto.text, post, author });
    return this.commentRepo.save(comment);
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    Object.assign(comment, dto);
    return this.commentRepo.save(comment);
  }

  async removeComment(id: number) {
    const result = await this.commentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Comment not found');
  }
}
