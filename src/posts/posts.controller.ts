import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { createPostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { updatePostDto } from './dtos/update-post.dto';
import { PaginationDto } from './dtos/pagination-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostsDto } from './dtos/posts.dto';
import { PostDto } from './dtos/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Serialize(PostsDto)
  @UseGuards(AuthGuard)
  @Get()
  async getPaginatedPosts(
    @Query() paginationDto: PaginationDto,
    @Request() request: any,
  ) {
    return this.postsService.getPaginatedPosts(paginationDto, request.user.sub);
    // console.log(
    //   await this.postsService.getPaginatedPosts(paginationDto, request.user.id),
    // );
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  getAllPost(@Request() request: any) {
    return this.postsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getOnePost(@Param('id') id: string, @Request() request: any) {
    return this.postsService.findOne(Number(id));
  }

  @Serialize(PostDto)
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() body: createPostDto, @Request() request: any) {
    return this.postsService.create(body, request.user.sub);
  }

  @Serialize(PostDto)
  @UseGuards(AuthGuard)
  @Put('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() body: updatePostDto,
    @Request() request: any,
  ) {
    return this.postsService.update(Number(id), body, request.user.sub);
  }

  @Serialize(PostDto)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: string, @Request() request: any) {
    return this.postsService.delete(Number(id), request.user.sub);
  }
}
