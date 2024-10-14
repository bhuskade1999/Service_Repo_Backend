"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const gqlHost = graphql_1.GqlArgumentsHost.create(host);
        const context = gqlHost.getContext();
        const response = context.res || context.req?.res;
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }
        else if (typeof exception === "object" && exception !== null) {
            const exceptionObject = exception;
            if (exceptionObject.status) {
                status = exceptionObject.status;
            }
        }
        if (exception.response) {
            if (exception.response.message &&
                Array.isArray(exception.response.message)) {
                message = exception.response.message[0];
            }
        }
        if (response && !response.headersSent) {
            console.log("Sending error response", message);
            return response.status(status).json({
                statusCode: status,
                message: message,
                error: "Internal problem",
            });
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=exception.filter.js.map