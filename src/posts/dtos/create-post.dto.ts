import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class createPostDto {
  @IsString()
  body: string;

  @IsString()
  file: string;
}
