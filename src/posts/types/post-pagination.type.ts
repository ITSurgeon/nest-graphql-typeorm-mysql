import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostEntity } from '../entities/post.entity';

@ObjectType()
export class PostPaginationType {
  @Field(() => [PostEntity])
  data: PostEntity[];

  @Field(() => Int)
  countAll: number;

  @Field(() => Int)
  page: number;
}
