import { Expose, Transform } from 'class-transformer';

export class LikeDto {
  @Expose()
  id: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;

  @Transform(({ obj }) => obj.post.id)
  @Expose()
  post_id: number;

  @Expose()
  created_at: string;
}
