import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { LikeDto } from './dtos/like.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Serialize(LikeDto)
  @UseGuards(AuthGuard)
  @Post('/:post_id')
  createLike(@Param('post_id') post_id: string, @Request() request: any) {
    return this.likesService.create(Number(post_id), request.user.sub);
  }

  //   @Serialize(LikeDto)
  @UseGuards(AuthGuard)
  @Delete('/:post_id')
  deletePost(@Param('post_id') post_id: string, @Request() request: any) {
    return this.likesService.delete(Number(post_id), request.user.sub);
  }
}
