import {
  NotFoundException,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import BaseService from 'src/core/service/base.service';
import { UserContactDto } from '../dtos/user-contact.dto';
import { CreateUserContactDto } from '../dtos/create-user-contact.dto';
import { CheckUserContactDto, CheckUsernameDto } from '../dtos/check-user.dto';
import { RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CacheTypeEnum } from 'src/core/enums/cache.enum';
import { RoleAuthDto } from 'src/core/dtos/role-auth.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheUserService extends BaseService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super(CacheUserService.name);
  }

  async cacheStore(
    type: CacheTypeEnum,
    store: RoleAuthDto,
    time?: number,
  ): Promise<void> {
    const timeDefault: number = time ? time : 86400000;
    await this.cacheManager.set(
      `${type}:${store.email}`, 
      store, 
      timeDefault
    );
  }

  async getCacheBaseService(email: string): Promise<RoleAuthDto> {
    try {
      const data: RoleAuthDto = (await this.cacheManager.get(
        `${CacheTypeEnum.ACCESS}:${email}`,
      )) as RoleAuthDto;
      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
