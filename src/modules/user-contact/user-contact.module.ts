import { Module } from '@nestjs/common';
import { UserContactService } from './services/user-contact.service';
import { UserContactController } from './user-contact.controller';
import { PrismaService } from 'src/core/service/prisma.service';
import { CacheUserService } from './services/cache-user.service';

@Module({
  controllers: [UserContactController],
  providers: [UserContactService, PrismaService, CacheUserService],
})
export class UserContactModule {}
