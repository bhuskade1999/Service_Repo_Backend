import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserReturnType, UserSchema } from "src/entity/user.entity";

@Resolver(() => UserSchema)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserReturnType, { name: "login" })
  signIns(@Args("email") email: string, @Args("password") password: string) {
    return this.authService.signIn(email, password);
  }
}
