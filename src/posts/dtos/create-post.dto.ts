import { IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  body: string;

  @IsString()
  file: string;
}
