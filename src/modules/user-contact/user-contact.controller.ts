import { BadRequestException, Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { UserContactService } from './services/user-contact.service';
import { Response } from 'express';
import BadRequestError from 'src/core/errors/bad-request.errors';
import BaseController from 'src/core/controllers/base.controller';
import { ApiResponse } from '@nestjs/swagger';
import { UserContactDto } from './dtos/user-contact.dto';
import { CreateUserContactDto } from './dtos/create-user-contact.dto';
import { CheckUserContactDto, CheckUsernameDto } from './dtos/check-user.dto';
import { RoleAuthDto } from 'src/core/dtos/role-auth.dto';


@Controller({ 
  version: '1', 
  path: 'api/user-contact'
})
export class UserContactController extends BaseController{
  constructor(private readonly userContactService: UserContactService) {
    super(UserContactController.name)
  }

  /**
   * Create user
   * @param res
   * @returns
   */
  @ApiResponse({ description: 'Data has been get', status: 200 })
  @ApiResponse({ description: 'Bad request data', status: 400 })
  @ApiResponse({ description: 'Data Not found', status: 404 })
  @ApiResponse({ description: 'Internal server error', status: 500 })
  @Post('create')
  async createUserContact(
    @Res() res: Response,
    @Body() dto: CreateUserContactDto
  ): Promise<Response> {
    try {
      const data: UserContactDto =
        await this.userContactService.createUser(dto);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Check User Contact by username and password
   * @param res
   * @returns
   */
  @ApiResponse({ description: 'Data has been get', status: 200 })
  @ApiResponse({ description: 'Bad request data', status: 400 })
  @ApiResponse({ description: 'Data Not found', status: 404 })
  @ApiResponse({ description: 'Internal server error', status: 500 })
  @Get('check/username')
  async checkUserByUsername(
    @Res() res: Response,
    @Body() dto: CheckUsernameDto
  ): Promise<Response> {
    try {
      const data: UserContactDto =
        await this.userContactService.checkUserByUsername(dto);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Search User Contact by email or role
   * @param res
   * @returns
   */
  @ApiResponse({ description: 'Data has been get', status: 200 })
  @ApiResponse({ description: 'Bad request data', status: 400 })
  @ApiResponse({ description: 'Data Not found', status: 404 })
  @ApiResponse({ description: 'Internal server error', status: 500 })
  @Get('check/data')
  async checkUserByData(
    @Res() res: Response,
    @Body() dto: CheckUserContactDto
  ): Promise<Response> {
    try {
      const data: UserContactDto[] =
        await this.userContactService.checkUserByData(dto);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Check cache authentification
   * @param res
   * @returns
   */
  @ApiResponse({ description: 'Data has been get', status: 200 })
  @ApiResponse({ description: 'Bad request data', status: 400 })
  @ApiResponse({ description: 'Data Not found', status: 404 })
  @ApiResponse({ description: 'Internal server error', status: 500 })
  @Get('check/cache')
  async checkCacheLogin(
    @Res() res: Response,
    @Query('email') email: string 
  ): Promise<Response> {
    try {
      const data: RoleAuthDto =
        await this.userContactService.checkCacheEmail(email);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}
