import { Optional } from '@nestjs/common';
import { IsString, IsUrl } from 'class-validator';

export class updatePostDto {
  @Optional()
  @IsString()
  body: string;

  @Optional()
  @IsUrl()
  file: string;

  @IsString()
  userId: number;
}
