import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

enum UserRole {
  USER = "user",
  ADMIN = "admin",
  PROJECTMANAGER = "projectManager",
  EMPLOYEE = "employee",
}

// Register enum type
registerEnumType(UserRole, { name: "UserRole" });

@ObjectType()
export class UserSchema {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class UserReturnType {
  @Field()
  message: string;

  @Field({ nullable: true })
  access_token?: string;

  @Field(() => UserSchema, { nullable: true })
  user?: UserSchema;
}
