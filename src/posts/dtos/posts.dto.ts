import { Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';

export class PostsDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  totalPages: number;

  @Expose()
  @Type(() => PostDto)
  data: PostDto[];
}
