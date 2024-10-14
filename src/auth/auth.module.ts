import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../DatabaseConnection/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

@Module({
  imports: [
    PrismaModule,

    JwtModule.register({
      global: true,
      secret: config.get<string>("JWTSECRET"),
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
