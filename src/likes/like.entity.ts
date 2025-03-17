import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column()
  postId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  //   @OneToMany(() => Booking, (booking) => booking.slot, { cascade: true })
  //   bookings: Booking[];

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Post with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed Post with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Post with id', this.id);
  }
}
