import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
// import { HelperModule } from "src/helper/helper.module";
import { PrismaModule } from "src/DatabaseConnection/prisma.module";
import { UserResolver } from "./user.resolver";
// import { CustomStringScalar } from "src/exceptionalFilter/custom.scaller";

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  controllers: [],
})
export class UserModule {}
