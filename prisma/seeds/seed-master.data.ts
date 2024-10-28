import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class InsertAllSeed {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;

  logger: Logger;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.logger = new Logger(InsertAllSeed.name);
  }

  async handleSeeds(): Promise<void> {
    const myPassword: string = await bcrypt.hash('kominfo123', 10);
    await this.prisma.userContact.createMany({
      data: [
        {
          email: 'ravelinno9@gmail.com',
          role: RoleEnum.SUPER_ADMIN,
          username: 'Ravel28',
          password: myPassword,
        }
      ]
    })

    this.logger.log('Creating all seed...');
  }
}
