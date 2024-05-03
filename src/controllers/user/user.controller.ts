import { Body, Controller, Get, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRequestUserDto } from 'src/adapters/request/adapter.request.user';
import { UserService } from 'src/services/service.user';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async create(@Body() dto: CreateRequestUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: any) {
    return await this.userService.login(dto);
  }

  @Get('paginated')
  @UseInterceptors(DefaultMiddleware)
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.userService.findPaginated(page, limit);
  }

  @Get('me')
  @UseInterceptors(DefaultMiddleware)
  async findCurrentUser(@Req() request: Request) {
    return await this.userService.findById(request.user);
  }

  @Get('find-by-id')
  @UseInterceptors(DefaultMiddleware)
  async findUserById(@Query('id') id: string,) {
    return await this.userService.findById(id);
  }
}
