import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from '../dto/comment.dto';

@ObjectType()
export class CommentPaginationType {
  @Field(() => [CommentEntity])
  data: CommentEntity[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  page: number;
}
