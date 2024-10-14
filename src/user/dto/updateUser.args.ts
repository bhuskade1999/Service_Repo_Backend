import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateTaskArgs {
  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
