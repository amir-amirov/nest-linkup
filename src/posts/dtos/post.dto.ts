import { Expose, Transform } from 'class-transformer';

export class PostDto {
  //   @Transform(({ obj }) => obj.user.id)
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  file: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;

  //   @Transform(({ obj }) => obj.likes)
  //   @Expose()
  //   likesCount: number;

  //   @Transform(({ obj }) => obj.likes)
  @Expose()
  likesCount: number;

  @Expose()
  likedByMe: boolean;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}
