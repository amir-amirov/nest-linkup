import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { createCommentDto } from './dtos/create-comment.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CommentDto } from './dtos/comment.dto';
import { getCommentsDto } from './dtos/get-comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Serialize(getCommentsDto)
  @UseGuards(AuthGuard)
  @Get()
  async getComments() {
    const data = await this.commentsService.findAll();
    return {
      message: 'success',
      comments: data,
    };
  }

  @Serialize(getCommentsDto)
  @UseGuards(AuthGuard)
  @Get(':post_id')
  async getCommentsByPostID(@Param('post_id') post_id: string) {
    const data = await this.commentsService.findByPostId(Number(post_id));
    return {
      message: 'success',
      comments: data,
    };
  }

  @Serialize(CommentDto)
  @UseGuards(AuthGuard)
  @Post('/:post_id')
  createComment(
    @Param('post_id') post_id: string,
    @Body() body: createCommentDto,
    @Request() request: any,
  ) {
    console.log('User: ', request.user.email);
    return this.commentsService.create(Number(post_id), body, request.user.sub);
  }

  @Serialize(CommentDto)
  @UseGuards(AuthGuard)
  @Delete('/:comment_id')
  deleteComment(
    @Param('comment_id') comment_id: string,
    @Request() request: any,
  ) {
    return this.commentsService.delete(Number(comment_id), request.user.sub);
  }
}
