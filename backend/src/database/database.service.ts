import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // import prisma

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); // connect to a database
  }
}
