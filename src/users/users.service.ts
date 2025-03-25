import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dtos/create-user.dto';
import { setTokenDto } from './dtos/set-token.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: createUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      const newUser = this.repo.create({ ...user, ...attrs });
      return this.repo.save(newUser);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      return this.repo.remove(user);
    }
  }

  async setFcmToken(setTokenDto: setTokenDto, user_id: number) {
    const user = await this.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id}`);
    }

    user.device_token = setTokenDto.device_token;

    return this.repo.save(user);
  }
}
