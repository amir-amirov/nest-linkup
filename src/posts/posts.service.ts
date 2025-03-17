import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createPostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from './dtos/pagination-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private repo: Repository<Post>,
    private usersService: UsersService,
  ) {}

  getAll() {
    return this.repo.find();
  }

  async getPaginatedPosts(paginationDto: PaginationDto, user_id: number) {
    console.log('User ID:', user_id);
    const { page, limit } = paginationDto;

    const [posts, total] = await this.repo.findAndCount({
      relations: ['user', 'likes'], // Load user and likes
      take: limit,
      skip: (page - 1) * limit,
      order: { created_at: 'ASC' },
    });

    const postsWithLikedByMe = posts.map((post) => ({
      ...post,
      name: post.user.name,
      likesCount: post.likes.length,
      likedByMe: post.likes.some((like) => like.userId === user_id), // 👈 Check here
    }));

    return {
      data: postsWithLikedByMe,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(createPostDto: createPostDto, id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist!`);
    } else {
      const post = this.repo.create(createPostDto);
      post.user = user;
      const postSaved = await this.repo.save(post);

      const formatedResponse = {
        ...postSaved,
        name: user.name,
        likesCount: 0,
        likedByMe: false,
      };
      return formatedResponse;
    }
  }

  async update(post_id: number, attrs: Partial<Post>, user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }

    const post = await this.findOne(post_id);
    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} doesn't exist!`);
    } else {
      if (post.user.id != user_id) {
        throw new ForbiddenException(
          `Forbidden! User with id ${user_id} is not owner of the post`,
        );
      }
      const newPost = this.repo.create({ ...post, ...attrs });
      return this.repo.save(newPost);
    }
  }

  async delete(post_id: number, user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }

    const post = await this.findOne(post_id);
    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} doesn't exist!`);
    } else {
      if (post.user.id != user_id) {
        throw new ForbiddenException(
          `Forbidden! User with id ${user_id} is not owner of the post`,
        );
      }

      return this.repo.remove(post);
    }
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
