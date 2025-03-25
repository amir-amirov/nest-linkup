import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { UsersModule } from 'src/users/users.module';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, FirebaseService],
  exports: [NotificationsService, FirebaseService],
})
export class NotificationsModule {}
