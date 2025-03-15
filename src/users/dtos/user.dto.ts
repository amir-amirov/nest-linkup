import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
