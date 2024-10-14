import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
// import { UserSchema } from 'src/entity/user.entity';
import { CreateUserArgs } from "./dto/createUser.args";
import { UserService } from "./user.service";
import { UserReturnType, UserSchema } from "src/entity/user.entity";
import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/exceptionalFilter/exception.filter";
import { UpdateTaskArgs } from "./dto/updateUser.args";
import { AuthGuard } from "src/auth/gaurds/auth.gaurds";
import { TaskSchema, TasksReturnType } from "src/entity/task.entity";
import { CreateTaskArgs } from "./dto/createTask.args";

// @UseFilters(HttpExceptionFilter)
@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserReturnType, {
    name: "createUser",
  })
  createUser(
    @Args("createUserArgs") createUserArgs: CreateUserArgs
  ): Promise<UserReturnType> {
    return this.userService.createUser(createUserArgs);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserSchema, { name: "myProfile" })
  async myProfile(@Context() context) {
    const userId = context?.req?.user?.sub;
    console.log("userid is", userId);
    return await this.userService.myProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TasksReturnType, { name: "createTasks" })
  async createTask(
    @Context() context,
    @Args("createTaskArgs") createTaskArgs: CreateTaskArgs
  ) {
    const userId = context?.req?.user?.sub;
    let response = await this.userService.createTasks(createTaskArgs, userId);
    console.log(response);
    return response;
  }

  @UseGuards(AuthGuard)
  @Query(() => [TaskSchema], { name: "getAllTasks" })
  async getTasksBetweenDates(
    @Context() context,
    @Args("updateTaskArgs") updateTaskArgs: UpdateTaskArgs
  ) {
    const userId = context?.req?.user?.sub;

    let response = await this.userService.getTasksBetweenDates(
      updateTaskArgs,
      userId
    );

    return response;
  }
}
