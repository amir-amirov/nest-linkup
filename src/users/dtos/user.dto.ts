import { Expose, Transform } from 'class-transformer';

export class UserDto {
  // @Expose()
  // id: number;

  // @Expose()
  // email: string;

  // @Expose()
  // name: string;

  // @Expose()
  // image: string;

  @Expose()
  @Transform(({ obj }) => {
    return {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      image: obj.image,
    };
  })
  user: { id: number; name: string; email: string; image: string };

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
