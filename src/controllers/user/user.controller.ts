import { Body, Controller, Get, Post, Put, Query, Req, HttpCode, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateRequestUserDto, LoginRequestDto, UpdatePasswordRequestUserDto, UpdateRequestUserDto } from 'src/adapters/request/user.request.dto';
import { UserService } from 'src/services/user/user.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { Request } from 'express';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/adapters/response/user.response.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'It should correctly return User',
    type: UserResponseDto
  })
  async create(@Body() dto: CreateRequestUserDto) {
    return await this.userService.create(dto);
  }

  @UseGuards(DefaultMiddleware)
  @Put('')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'It should correctly return User',
    type: UserResponseDto
  })
  async update(@Body() dto: UpdateRequestUserDto, @Req() request: Request) {
    dto.id = request.user;
    return await this.userService.update(dto);
  }

  @UseGuards(DefaultMiddleware)
  @Put('update-password')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'It should correctly return User',
    type: UserResponseDto
  })
  async updatePassword(@Body() dto: UpdatePasswordRequestUserDto, @Req() request: Request) {
    dto.id = request.user;
    return await this.userService.updatePassword(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'It should correctly return LoginResponseDto',
    type: LoginRequestDto
  })
  async login(@Body() dto: LoginRequestDto) {
    return await this.userService.login(dto);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:users'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'It should correctly return Users[]',
    type: [UserResponseDto]
  })
  @HttpCode(200)
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.userService.findPaginated(page, limit);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:users'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'It should correctly return User',
    type: UserResponseDto
  })
  @HttpCode(200)
  @Get('find-by-id')
  async findUserById(@Query('id') id: string,) {
    return await this.userService.findById(id);
  }

  @UseGuards(DefaultMiddleware)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'It should correctly return User',
    type: UserResponseDto
  })
  @HttpCode(200)
  @Get('me')
  async findCurrentUser(@Req() request: Request) {
    return await this.userService.findById(request.user);
  }
}
