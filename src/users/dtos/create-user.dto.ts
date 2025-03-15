import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
