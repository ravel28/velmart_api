import {
  BadRequestException,
  Inject,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import ServiceError from '../errors/service.error';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTypeEnum } from '../enums/cache.enum';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { RoleAuthDto } from '../dtos/role-auth.dto';

abstract class BaseService {
  public logger: Logger;
  private instanceName: string;

  constructor(instance: string) {
    this.logger = new Logger(instance);
    this.instanceName = instance;
  }

  handleErrorService(error: any) {
    this.logger.error(error.name);
    this.logger.error(error.message);

    if (error instanceof BadRequestException)
      throw new BadRequestException(error.getResponse());
    if (error instanceof NotFoundException)
      throw new NotFoundException(error.getResponse());
    if (error instanceof UnauthorizedException)
      throw new UnauthorizedException(error.getResponse());

    if (error instanceof PrismaClientKnownRequestError) 
      throw new ServiceError(
        `${error.name} ${error?.code}: Please check the input ${error.meta.target[0]}`,
      );

    if (error instanceof PrismaClientValidationError) {
      throw new ServiceError(`${error.name}: ${error.message}`);
    }

    throw new ServiceError(error);
  }
}

export default BaseService;
