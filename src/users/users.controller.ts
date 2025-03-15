import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { loginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: createUserDto) {
    const result = await this.authService.signup(body);
    return result;
  }

  @Post('/signin')
  async signInUser(@Body() body: loginUserDto) {
    const result = await this.authService.signin(body);
    return result;
  }
}
