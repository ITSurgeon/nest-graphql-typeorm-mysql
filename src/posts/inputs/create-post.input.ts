import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  text: string;

  @Field({ nullable: true })
  image?: string;
}
