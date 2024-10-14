"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const prisma_module_1 = require("../DatabaseConnection/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const auth_resolver_1 = require("./auth.resolver");
const config_1 = require("@nestjs/config");
const config = new config_1.ConfigService();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: config.get("JWTSECRET"),
                signOptions: { expiresIn: "1h" },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map