import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../DatabaseConnection/prisma.service";
import { Prisma, Task, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger("User service");

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    this.logger.log("userById");
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const { email, password } = data;
    for (const key in data) {
      if (!data[key]) {
        throw new BadRequestException(`User ${key} is required`);
      }
    }
    // Check for existing user
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (existingUser && existingUser?.email === email) {
      throw new ConflictException("Email already exists");
    }

    // const hashPassword = await this.helperService.hashPassword(password);
    const createUser = await this.prisma.user.create({
      data: {
        ...data,
        password: password,
      },
    });

    // if (createUser.role !== "admin") {
    //   this.emailService.sendUserWelcome(createUser);
    // }

    const userResponse = {
      message: "Registration Successfully Added",
    };
    return userResponse;
  }

  async myProfile(userId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getAllUser(): Promise<User[]> {
    const allUser = await this.prisma.user.findMany();
    return allUser;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log("deleteUser");
    const deleteUser = await this.prisma.user.delete({
      where,
    });
    return deleteUser;
  }

  async createTasks(data, userId: number) {
    const { currentDay, day, night } = data;

    await this.prisma.task.create({
      data: {
        currentDay: currentDay,
        day: day,
        night: night,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
      },
    });
    const taskResponse = {
      message: "Task created successfully",
    };
    return taskResponse;
  }

  async getTasksBetweenDates(data, userId) {
    const { startDate, endDate } = data;
    const startDates = convertToDateObject(startDate); // JavaScript Date object
    const endDates = convertToDateObject(endDate);
    console.log("userid--->", userId);
    let tasks = await this.prisma.$queryRaw<Task[]>`
      SELECT * FROM Task 
      WHERE currentDay >= ${startDates} AND currentDay <= ${endDates} AND userId=${userId}
    `;
    return tasks; // Return tasks directly
  }
}

// Helper function to convert "DD/MM/YYYY" to a JavaScript Date object
function convertToDateObject(dateString: string): Date {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}T00:00:00Z`); // Create Date object
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`; // Return in "DD/MM/YYYY" format for output
}
