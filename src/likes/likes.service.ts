import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private repo: Repository<Like>,
    private usersService: UsersService,
    private postsService: PostsService,
    private notificationsService: NotificationsService,
  ) {}

  async create(post_id: number, user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }
    const post = await this.postsService.findOne(post_id);

    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} doesn't exist!`);
    }

    const isPostLikedByUser = await this.findOne(post_id, user_id);

    if (isPostLikedByUser) {
      throw new BadRequestException('Already liked');
    } else {
      const like = this.repo.create();
      like.post = post;
      like.user = user;
      const savedLiked = await this.repo.save(like);

      if (savedLiked) {
        await this.notificationsService.create({
          senderId: user_id,
          receiverId: post.user.id,
          postId: post_id,
          type: 'like',
        });
      }

      return savedLiked;
    }
  }

  async delete(post_id: number, user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }
    const post = await this.postsService.findOne(post_id);

    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} doesn't exist!`);
    } else {
      const like = await this.findOne(post_id, user_id);
      if (!like) {
        throw new NotFoundException(
          `Like not found for post ${post_id} and user ${user_id}`,
        );
      }

      return this.repo.remove(like);
    }
  }

  findOne(post_id: number, user_id: number) {
    return this.repo.findOneBy({
      post: { id: post_id },
      user: { id: user_id },
    });
  }
}
