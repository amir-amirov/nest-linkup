import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  type: 'comment' | 'like';

  @IsNumber()
  postId: number;
}
