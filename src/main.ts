import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cors from "cors"; // Import cors module

async function bootstrap() {
  const corsOptions = {
    origin: "*", // Replace with your allowed origin
    methods: ["GET", "POST", "OPTIONS"], // Allowed methods
    credentials: true, // Enable credentials if needed
  };
  const app = await NestFactory.create(AppModule);

  app.use(cors(corsOptions));
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3030);
}
bootstrap();
