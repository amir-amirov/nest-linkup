import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/likes/like.entity';
import { Post } from 'src/posts/post.entity';
import { Notification } from 'src/notifications/notification.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToMany(() => Post, (post) => post.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  receivedNotifications: Notification[];

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
}
