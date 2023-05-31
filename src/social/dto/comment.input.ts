import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CommentEntity } from './comment.dto';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CommentCreateInput implements Partial<CommentEntity> {
  @MinLength(1)
  @MaxLength(500)
  @Field()
  text: string;
}

@InputType()
export class CommentUpdateInput extends PartialType(CommentCreateInput) {}
