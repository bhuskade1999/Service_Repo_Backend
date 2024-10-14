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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createUser_args_1 = require("./dto/createUser.args");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../entity/user.entity");
const common_1 = require("@nestjs/common");
const updateUser_args_1 = require("./dto/updateUser.args");
const auth_gaurds_1 = require("../auth/gaurds/auth.gaurds");
const task_entity_1 = require("../entity/task.entity");
const createTask_args_1 = require("./dto/createTask.args");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(createUserArgs) {
        return this.userService.createUser(createUserArgs);
    }
    async myProfile(context) {
        const userId = context?.req?.user?.sub;
        console.log("userid is", userId);
        return await this.userService.myProfile(userId);
    }
    async createTask(context, createTaskArgs) {
        const userId = context?.req?.user?.sub;
        let response = await this.userService.createTasks(createTaskArgs, userId);
        console.log(response);
        return response;
    }
    async getTasksBetweenDates(context, updateTaskArgs) {
        const userId = context?.req?.user?.sub;
        let response = await this.userService.getTasksBetweenDates(updateTaskArgs, userId);
        return response;
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserReturnType, {
        name: "createUser",
    }),
    __param(0, (0, graphql_1.Args)("createUserArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_args_1.CreateUserArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurds_1.AuthGuard),
    (0, graphql_1.Query)(() => user_entity_1.UserSchema, { name: "myProfile" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurds_1.AuthGuard),
    (0, graphql_1.Mutation)(() => task_entity_1.TasksReturnType, { name: "createTasks" }),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)("createTaskArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createTask_args_1.CreateTaskArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createTask", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurds_1.AuthGuard),
    (0, graphql_1.Query)(() => [task_entity_1.TaskSchema], { name: "getAllTasks" }),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)("updateTaskArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUser_args_1.UpdateTaskArgs]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getTasksBetweenDates", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.UserSchema),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map