import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheTypeEnum } from '../enums/cache.enum';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RoleAuthDto } from '../dtos/role-auth.dto';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly apiKeyPass: string = process.env.API_KEY;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    await this.getCache(apiKey, req);
    next();
  }

  async getCache(apiKey: string | string[], req: Request): Promise<void> {
    const data: RoleAuthDto = (await this.cacheManager.get(
      `${CacheTypeEnum.ACCESS}:${apiKey}`,
    )) as RoleAuthDto;
    if (!apiKey) throw new ForbiddenException();
    if (!data && apiKey !== this.apiKeyPass) throw new UnauthorizedException();
    if (
      (req.method === 'PUT' && data.role !== RoleEnum.SUPER_ADMIN &&
      data.role !== RoleEnum.ADMIN && apiKey !== this.apiKeyPass) ||
      (req.method === 'POST' && data.role !== RoleEnum.SUPER_ADMIN &&
        data.role !== RoleEnum.ADMIN && apiKey !== this.apiKeyPass)
    )
      throw new ForbiddenException();
  }
}
