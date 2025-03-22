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
export class Comment {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @ManyToOne(() => Post, (post) => post.comments, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Comment with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed Comment with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Comment with id', this.id);
  }
}
