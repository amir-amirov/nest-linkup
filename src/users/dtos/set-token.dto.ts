import { IsString } from 'class-validator';

export class setTokenDto {
  @IsString()
  device_token: string;
}
