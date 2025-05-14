// src/forum/forum.controller.ts
import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe
} from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  CreatePostDto, UpdatePostDto,
  CreateCommentDto, UpdateCommentDto
} from './dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forum: ForumService) {}

  // POSTS
  @Post('posts')
  createPost(@Body() dto: CreatePostDto) {
    return this.forum.createPost(dto);
  }

  @Get('posts')
  getAllPosts(@Query('search') search?: string) {
    return this.forum.findAllPosts(search);
  }

  @Get('posts/:id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.forum.findOnePost(id);
  }

  @Patch('posts/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto
  ) {
    return this.forum.updatePost(id, dto);
  }

  @Delete('posts/:id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.forum.removePost(id);
  }

  // COMMENTS
  @Post('comments')
  addComment(@Body() dto: CreateCommentDto) {
    return this.forum.addComment(dto);
  }

  @Patch('comments/:id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto
  ) {
    return this.forum.updateComment(id, dto);
  }

  @Delete('comments/:id')
  removeComment(@Param('id', ParseIntPipe) id: number) {
    return this.forum.removeComment(id);
  }
}
