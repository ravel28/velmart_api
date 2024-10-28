import { Module } from '@nestjs/common';
import { UserContactService } from './user-contact.service';
import { UserContactController } from './user-contact.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [UserContactController],
  providers: [UserContactService, PrismaService],
})
export class UserContactModule {}
