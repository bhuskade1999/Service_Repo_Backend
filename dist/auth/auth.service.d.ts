import { PrismaService } from "../DatabaseConnection/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        message: string;
        access_token: string;
    }>;
}
