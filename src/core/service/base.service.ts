import {
  BadRequestException,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import ServiceError from '../errors/service.error';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTypeEnum } from '../enums/cache.enum';

abstract class BaseService {
  public logger: Logger;
  private instanceName: string;
  @Inject(CACHE_MANAGER) private cacheManager: Cache;

  constructor(instance: string) {
    this.logger = new Logger(instance);
    this.instanceName = instance;
  }

  async cacheStore(
    type: CacheTypeEnum,
    store: string,
    time?: number,
  ): Promise<void> {
    const timeDefault: number = time ? time : 3600;
    await this.cacheManager.set(`${type}:${store}`, timeDefault);
  }

  

  handleErrorService(error: any) {
    this.logger.error(error.name);
    this.logger.error(error);
    if (error?.response?.statusCode === 404)
      throw new NotFoundException(error.response);
    if (error?.response?.statusCode === 400)
      throw new BadRequestException(error.response);
    throw new ServiceError(error);
  }
}

export default BaseService;
