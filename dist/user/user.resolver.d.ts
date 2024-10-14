import { CreateUserArgs } from "./dto/createUser.args";
import { UserService } from "./user.service";
import { UserReturnType } from "src/entity/user.entity";
import { UpdateTaskArgs } from "./dto/updateUser.args";
import { CreateTaskArgs } from "./dto/createTask.args";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserArgs: CreateUserArgs): Promise<UserReturnType>;
    myProfile(context: any): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
    }>;
    createTask(context: any, createTaskArgs: CreateTaskArgs): Promise<{
        message: string;
    }>;
    getTasksBetweenDates(context: any, updateTaskArgs: UpdateTaskArgs): Promise<{
        id: number;
        currentDay: Date;
        day: number;
        night: number;
        userId: number;
    }[]>;
}
