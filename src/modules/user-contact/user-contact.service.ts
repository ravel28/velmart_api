import { Injectable } from '@nestjs/common';
import BaseService from 'src/core/service/base.service';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class UserContactService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(UserContactService.name);
  }
}
