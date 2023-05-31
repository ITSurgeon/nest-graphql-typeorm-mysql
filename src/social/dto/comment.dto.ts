import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostEntity } from 'src/social/dto/post.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('comments')
export class CommentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => PostEntity)
  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;

  @Field()
  @Column()
  text: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
