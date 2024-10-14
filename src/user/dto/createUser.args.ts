import { Field, InputType } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

@InputType()
export class CreateUserArgs {
  @Field()
  @IsNotEmpty({ message: "Username required" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @Field()
  @IsNotEmpty({ message: "Email Is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Password Is required" })
  @Length(8, 25, { message: "Password must be 8 to 15 characters" })
  password: string;
}
