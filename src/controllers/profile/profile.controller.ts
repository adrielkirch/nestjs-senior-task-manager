import { Body, Controller, Get, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateProfileRequestDto, UpdateProfileRequestDto } from 'src/adapters/request/profile.request.dto';
import { ProfileService } from 'src/services/profile/profile.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { Request } from 'express';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('create')
  @ApiCreatedResponse({
    description: "It should correctly return Profile",
    type: ProfileResponseDto
  })
  async create(@Body() dto: CreateProfileRequestDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.profileService.create(dto);
  }

  @Put('')
  @ApiCreatedResponse({
    description: "It should correctly return Profile",
    type: ProfileResponseDto
  })
  async update(@Body() dto: UpdateProfileRequestDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.profileService.update(dto);
  }


  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:profiles'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "It should correctly return Profiles[]",
    type: [ProfileResponseDto]
  })
  @Get('paginated')
  async findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.profileService.findPaginated(page, limit);
  }

  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['read:profiles'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "It should correctly return Profile",
    type: ProfileResponseDto
  })
  @Get('find-by-id')
  async findProfileById(@Query('id') id: string,) {
    return await this.profileService.findById(id);
  }
}
