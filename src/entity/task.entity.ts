import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { UserSchema } from "./user.entity";

@ObjectType()
export class TaskSchema {
  @Field(() => ID)
  id: number;

  @Field()
  currentDay?: Date;

  @Field(() => Int, { nullable: true })
  day?: number;

  @Field(() => Int, { nullable: true })
  night?: number;

  @Field(() => UserSchema)
  user?: UserSchema;

  @Field(() => Int, { nullable: true })
  userId?: number;
}

@ObjectType()
export class TasksReturnType {
  @Field()
  message: string;

  @Field(() => TaskSchema, { nullable: true })
  tasks?: TaskSchema;
}
