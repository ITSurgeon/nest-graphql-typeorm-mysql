import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;
}
