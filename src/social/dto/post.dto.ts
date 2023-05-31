import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from 'src/social/dto/comment.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('posts')
export class PostEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.post, { nullable: true })
  comments: CommentEntity[];

  @Field()
  @Column()
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
