import { UserSchema } from "./user.entity";
export declare class TaskSchema {
    id: number;
    currentDay?: Date;
    day?: number;
    night?: number;
    user?: UserSchema;
    userId?: number;
}
export declare class TasksReturnType {
    message: string;
    tasks?: TaskSchema;
}
