import { BadRequestException, Controller, Get, Res } from '@nestjs/common';
import { UserContactService } from './user-contact.service';
import { Response } from 'express';
import BadRequestError from 'src/core/errors/bad-request.errors';

@Controller('user-contact')
export class UserContactController {
  constructor(private readonly userContactService: UserContactService) {}
}
