import { Expose, Type } from 'class-transformer';
import { CommentDto } from './comment.dto';

export class getCommentsDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
