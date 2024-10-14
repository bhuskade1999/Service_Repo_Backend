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
exports.TasksReturnType = exports.TaskSchema = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user.entity");
let TaskSchema = class TaskSchema {
};
exports.TaskSchema = TaskSchema;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], TaskSchema.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], TaskSchema.prototype, "currentDay", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TaskSchema.prototype, "day", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TaskSchema.prototype, "night", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserSchema),
    __metadata("design:type", user_entity_1.UserSchema)
], TaskSchema.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TaskSchema.prototype, "userId", void 0);
exports.TaskSchema = TaskSchema = __decorate([
    (0, graphql_1.ObjectType)()
], TaskSchema);
let TasksReturnType = class TasksReturnType {
};
exports.TasksReturnType = TasksReturnType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TasksReturnType.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => TaskSchema, { nullable: true }),
    __metadata("design:type", TaskSchema)
], TasksReturnType.prototype, "tasks", void 0);
exports.TasksReturnType = TasksReturnType = __decorate([
    (0, graphql_1.ObjectType)()
], TasksReturnType);
//# sourceMappingURL=task.entity.js.map