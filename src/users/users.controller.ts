import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { loginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Put('/update-profile')
  async updateUser(@Body() body: updateUserDto) {
    console.log('Body: ', body);
    const result = await this.userService.update(body.id, body);
    console.log('Result: ', result);
    return result;
  }
}
