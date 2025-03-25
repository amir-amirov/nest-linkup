import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { loginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { setTokenDto } from './dtos/set-token.dto';

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

  @Get('/:id')
  async getUser(@Param('id') user_id: string) {
    const user = await this.userService.findOne(Number(user_id));

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    return user;
  }

  @UseGuards(AuthGuard)
  @Put('/update-profile')
  async updateUser(@Body() body: updateUserDto) {
    console.log('Body: ', body);
    const result = await this.userService.update(body.id, body);
    console.log('Result: ', result);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post('/fcm-token')
  async setFcmToken(@Body() body: setTokenDto, @Request() request: any) {
    const result = await this.userService.setFcmToken(body, request.user.sub);
    console.log('User: ', result);
    return result;
  }
}
