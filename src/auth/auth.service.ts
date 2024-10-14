import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../DatabaseConnection/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ message: string; access_token: string }> {
    if (!email || !password) {
      throw new NotFoundException("email and password are required");
    }

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException("user does not exist");
    }

    if (user.password !== password) {
      throw new NotFoundException("Invalid password");
    }

    const payload = { sub: user.id, name: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: "user logged in successfully",
      access_token: access_token,
    };
  }
}
