import { PrismaService } from "../DatabaseConnection/prisma.service";
import { Prisma, User } from "@prisma/client";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private logger;
    user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<{
        message: string;
    }>;
    myProfile(userId: number): Promise<User>;
    getAllUser(): Promise<User[]>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
    createTasks(data: any, userId: number): Promise<{
        message: string;
    }>;
    getTasksBetweenDates(data: any, userId: any): Promise<{
        id: number;
        currentDay: Date;
        day: number;
        night: number;
        userId: number;
    }[]>;
}
