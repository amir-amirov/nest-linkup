import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column()
  type: string;

  @ManyToOne(() => Post, (post) => post.notifications, {
    eager: true,
    onDelete: 'CASCADE',
  })
  post: Post;

  @Column({ nullable: true })
  commentId: number;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  // Sender relation (user who sends the notification)
  @ManyToOne(() => User, (user) => user.sentNotifications, {
    eager: true,
    onDelete: 'CASCADE',
  })
  sender: User;

  // Receiver relation (user who receives the notification)
  @ManyToOne(() => User, (user) => user.receivedNotifications, {
    onDelete: 'CASCADE',
  })
  receiver: User;
}
