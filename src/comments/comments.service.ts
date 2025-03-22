import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { createCommentDto } from './dtos/create-comment.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    private usersService: UsersService,
    private postsService: PostsService,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    post_id: number,
    createCommentDto: createCommentDto,
    user_id: number,
  ) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }
    const post = await this.postsService.findOne(post_id);

    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} doesn't exist!`);
    }

    const comment = this.repo.create(createCommentDto);
    comment.post = post;
    comment.user = user;
    const savedPost = await this.repo.save(comment);

    if (savedPost) {
      await this.notificationsService.create({
        senderId: user_id,
        receiverId: post.user.id,
        postId: post_id,
        type: 'comment',
      });
    }

    return savedPost;
  }

  async delete(comment_id: number, user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} doesn't exist!`);
    }
    const comment = await this.findOne(comment_id);
    if (!comment) {
      throw new NotFoundException(
        `Comment not found with id ${comment_id} and user ${user_id}`,
      );
    }

    return this.repo.remove(comment);
  }

  findOne(comment_id: number) {
    return this.repo.findOneBy({
      id: comment_id,
    });
  }

  findAll() {
    return this.repo.find();
  }

  findByPostId(post_id: number) {
    return this.repo.find({
      where: {
        post: {
          id: post_id,
        },
      },
      order: { created_at: 'DESC' },
    });
  }
}
