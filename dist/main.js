"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cors = require("cors");
async function bootstrap() {
    const corsOptions = {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        credentials: true,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors(corsOptions));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map