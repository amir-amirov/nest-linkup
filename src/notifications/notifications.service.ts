import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private repo: Repository<Notification>,
    private usersService: UsersService,
  ) {}
  getAll() {
    return this.repo.find();
  }

  async findById(user_id: number) {
    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User does not exist with id ${user_id}`);
    }

    return this.repo.find({
      where: {
        receiver: {
          id: user_id,
        },
      },
    });
  }

  async create(createNotificationDto: CreateNotificationDto) {
    if (createNotificationDto.receiverId == createNotificationDto.senderId) {
      return null;
    }

    const doesExist = await this.repo.findOne({
      where: {
        receiver: {
          id: createNotificationDto.receiverId,
        },
        sender: {
          id: createNotificationDto.senderId,
        },
        type: createNotificationDto.type,
        post: { id: createNotificationDto.post.id },
      },
    });

    if (doesExist) {
      return null;
    }

    const receiver = await this.usersService.findOne(
      createNotificationDto.receiverId,
    );
    const sender = await this.usersService.findOne(
      createNotificationDto.senderId,
    );
    if (!receiver || !sender) {
      return null;
    }
    const notification = this.repo.create(createNotificationDto);
    notification.receiver = receiver;
    notification.sender = sender;

    return this.repo.save(notification);
  }
}
