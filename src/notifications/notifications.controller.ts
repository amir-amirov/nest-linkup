import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Get('')
  getAllNotifications() {
    return this.notificationsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('/:user_id')
  getNotificationsById(@Param('user_id') id: string) {
    return this.notificationsService.findById(Number(id));
  }

  // @Serialize(LikeDto)
  @UseGuards(AuthGuard)
  @Post()
  createLike(@Body() body: CreateNotificationDto) {
    return this.notificationsService.create(body);
  }
}
