import { Body, Controller, Get, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateRequestUserDto, LoginRequestDto, UpdateRequestUserDto } from 'src/adapters/request/user.request.dto';
import { UserService } from 'src/services/user.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { Request } from 'express';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  @ApiCreatedResponse({
    description: "It should correctly return User",
  })
  async create(@Body() dto: CreateRequestUserDto) {
    return await this.userService.create(dto);
  }

 
  @Put('')
  @ApiCreatedResponse({
    description: "It should correctly return User",
  })
  async update(@Body() dto: UpdateRequestUserDto, @Req() request: Request) {
    dto.id = request.user
    return await this.userService.update(dto);
  }

 
  @Post('login')
  @ApiOkResponse({
    description: "It should correctly return LoginResponseDto",
  })
  async login(@Body() dto: LoginRequestDto) {
    return await this.userService.login(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:users'])
  @ApiOkResponse({
    description: "It should correctly return Users[]",
  })
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.userService.findPaginated(page, limit);
  }

 
  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:users'])
  @ApiOkResponse({
    description: "It should correctly return User",
  })
  @Get('find-by-id')
  async findUserById(@Query('id') id: string,) {
    return await this.userService.findById(id);
  }
 
  @UseGuards(DefaultMiddleware)
  @ApiOkResponse({
    description: "It should correctly return User",
  })
  @Get('me')
  async findCurrentUser(@Req() request: Request) {
    return await this.userService.findById(request.user);
  }
}
