import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./DatabaseConnection/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { ApolloError } from "@apollo/client";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        const originalError = error.extensions?.originalError as ApolloError;
        if (!originalError) {
          return {
            message: error.message,
            statusCode: error.extensions?.statusCode,
            code: error.extensions?.code,
          };
        }
        return originalError;
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
