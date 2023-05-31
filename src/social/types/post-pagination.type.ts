import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostEntity } from '../dto/post.dto';

@ObjectType()
export class PostPaginationType {
  @Field(() => [PostEntity])
  data: PostEntity[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  page: number;
}
