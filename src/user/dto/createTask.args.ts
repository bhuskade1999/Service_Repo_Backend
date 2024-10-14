import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateTaskArgs {
  @Field(() => Int)
  night: number;

  @Field()
  currentDay: Date;

  @Field(() => Int)
  day: number;
}
