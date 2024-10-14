"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../DatabaseConnection/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger("User service");
    }
    async user(userWhereUniqueInput) {
        this.logger.log("userById");
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
        return user;
    }
    async createUser(data) {
        const { email, password } = data;
        for (const key in data) {
            if (!data[key]) {
                throw new common_1.BadRequestException(`User ${key} is required`);
            }
        }
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }],
            },
        });
        if (existingUser && existingUser?.email === email) {
            throw new common_1.ConflictException("Email already exists");
        }
        const createUser = await this.prisma.user.create({
            data: {
                ...data,
                password: password,
            },
        });
        const userResponse = {
            message: "Registration Successfully Added",
        };
        return userResponse;
    }
    async myProfile(userId) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return user;
    }
    async getAllUser() {
        const allUser = await this.prisma.user.findMany();
        return allUser;
    }
    async deleteUser(where) {
        this.logger.log("deleteUser");
        const deleteUser = await this.prisma.user.delete({
            where,
        });
        return deleteUser;
    }
    async createTasks(data, userId) {
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
        const startDates = convertToDateObject(startDate);
        const endDates = convertToDateObject(endDate);
        console.log("userid--->", userId);
        let tasks = await this.prisma.$queryRaw `
      SELECT * FROM Task 
      WHERE currentDay >= ${startDates} AND currentDay <= ${endDates} AND userId=${userId}
    `;
        return tasks;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
function convertToDateObject(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
}
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
//# sourceMappingURL=user.service.js.map