import { Field, InputType, PartialType } from '@nestjs/graphql';
import { PostEntity } from './post.dto';
import { ArrayMaxSize, MaxLength, MinLength } from 'class-validator';

@InputType()
export class PostCreateInput implements Partial<PostEntity> {
  @MinLength(1)
  @MaxLength(1000)
  @Field()
  text?: string;

  @ArrayMaxSize(1)
  @Field(() => String, { nullable: true })
  image?: string;
}

@InputType()
export class PostUpdateInput extends PartialType(PostCreateInput) {}
