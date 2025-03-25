import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Post } from 'src/posts/post.entity';

export class CreateNotificationDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  type: 'comment' | 'like';

  @IsObject()
  post: Post;

  @IsNumber()
  @IsOptional()
  commentId: number | undefined;
}
