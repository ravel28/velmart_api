import {
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import BaseService from 'src/core/service/base.service';
import { PrismaService } from 'src/core/service/prisma.service';
import { UserContactDto } from '../dtos/user-contact.dto';
import { CreateUserContactDto } from '../dtos/create-user-contact.dto';
import { CheckUserContactDto, CheckUsernameDto } from '../dtos/check-user.dto';
import { RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CacheTypeEnum } from 'src/core/enums/cache.enum';
import { RoleAuthDto } from 'src/core/dtos/role-auth.dto';
import { CacheUserService } from './cache-user.service';

@Injectable()
export class UserContactService extends BaseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cacheUserService: CacheUserService,
  ) {
    super(UserContactService.name);
  }

  async createUser(dto: CreateUserContactDto): Promise<UserContactDto> {
    try {
      const passwordUser: string = await bcrypt.hash(dto.password, 10);
      return await this.prismaService.userContact.create({
        data: {
          email: dto.email,
          role: dto.role,
          username: null,
          password: passwordUser,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async checkUserByUsername(dto: CheckUsernameDto): Promise<UserContactDto> {
    try {
      const findData: UserContactDto =
        await this.prismaService.userContact.findFirst({
          where: {
            username: dto.username,
          },
        });

      if (!findData) throw new NotFoundException();

      const isMacthPassword: string = await bcrypt.compare(
        dto.password,
        findData.password,
      );

      if (!isMacthPassword) throw new UnauthorizedException();

      const roleAuth: RoleAuthDto = {
        email: findData.email,
        role: findData.role,
      };

      await this.cacheUserService.cacheStore(CacheTypeEnum.ACCESS, roleAuth, 7200);

      return findData;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async checkUserByData(dto: CheckUserContactDto): Promise<UserContactDto[]> {
    try {
      const filterEmail: string = dto.email ? dto.email : undefined;
      const roleKeyword: RoleEnum = dto.role ? dto.role : undefined;
      // const roleKeyword: FilterRoleEnumDto =
      //   dto.role ? { in: roleEnumFilterToUser(dto.role) }
      //     : undefined;

      const resultData: UserContactDto[] =
        await this.prismaService.userContact.findMany({
          where: {
            email: {
              contains: filterEmail,
              mode: 'insensitive',
            },
            role: roleKeyword,
          },
        });

      if (resultData.length < 1) throw new NotFoundException();

      return resultData;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async checkCacheEmail(email: string): Promise<RoleAuthDto> {
    try {
      const data: RoleAuthDto = await this.cacheUserService.getCacheBaseService(email);
      if(!data) throw new NotFoundException();
      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
