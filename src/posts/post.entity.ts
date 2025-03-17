import { Like } from 'src/likes/like.entity';
import { User } from 'src/users/user.entity';
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
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column({ nullable: true })
  body: string;

  @Column()
  file: string;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  //   @OneToMany(() => Booking, (booking) => booking.slot, { cascade: true })
  //   bookings: Booking[];

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Like, (like) => like.post, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  likes: Like[];

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
