import { ForbiddenException, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheTypeEnum } from '../enums/cache.enum';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly apiKeyPass: string = process.env.API_KEY;
  
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    await this.getCache(apiKey);
    
    next();
  }

  async getCache(
    apiKey: string | string[],
  ): Promise<void> {
    const data = await this.cacheManager.get(`access:${apiKey}`);
    if(!apiKey) throw new ForbiddenException();
    if(!data && apiKey !== this.apiKeyPass)
      throw new UnauthorizedException();
  }  
}

