import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from 'src/services/service.user';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() dto: any) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: any) {
    return await this.userService.login(dto);
  }

  @Get()
  async load() {
    return await this.userService.load();
  }

  @Get('find-by-id')
  async findById(@Query('id') id: string) {
    return await this.userService.findById(id);
  }
}
