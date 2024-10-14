import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$connect()
      .then(() => {
        console.log('Prisma Connected');
      })
      .catch((err) => {
        console.log('prisma connection failed :', err);
      });
  }
}
