import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;

  @Transform(({ obj }) => obj.user.image)
  @Expose()
  user_image: string;

  @Transform(({ obj }) => obj.user.name)
  @Expose()
  user_name: string;

  @Transform(({ obj }) => obj.post.id)
  @Expose()
  post_id: number;

  @Transform(({ obj }) => obj.post.user.id)
  @Expose()
  post_owner_id: number;

  @Expose()
  created_at: string;
}
