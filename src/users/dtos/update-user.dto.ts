import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class updateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  bio: string;
}
