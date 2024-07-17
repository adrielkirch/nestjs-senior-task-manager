import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateRequestTeamDto, DissociateRequestUserFromTeamDto, InviteRequestTeamDto, JoinRequestTeamDto } from 'src/adapters/request/team.request.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TeamService } from 'src/services/team/team.service';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { Request } from 'express';
import { InviteResponseDto } from 'src/adapters/response/team.response.dto';
import { TeamUserResponseDto } from 'src/adapters/response/teamUser.response.dto';

@ApiTags('Team')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post('create')
  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:teams'])
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'It should correctly return Team',
    type: CreateRequestTeamDto
  })
  async create(@Body() dto: CreateRequestTeamDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.teamService.create(dto);
  }

  @Post('invite')
  @UseGuards(DefaultMiddleware, PermissionGuard)
  @SetMetadata('permissions', ['write:teams'])
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'It should correctly return Team',
    type: InviteResponseDto
  })
  async invite(@Body() dto: InviteRequestTeamDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.teamService.invite(dto);
  }

  @Post('join')
  @UseGuards(DefaultMiddleware)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'It should correctly return TeamUser',
    type: TeamUserResponseDto
  })
  async join(@Body() dto: JoinRequestTeamDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.teamService.join(dto);
  }

  @Post('dissociate')
  @UseGuards(DefaultMiddleware)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'It should correctly return TeamUser',
    type: TeamUserResponseDto
  })
  async dissociate(@Body() dto: DissociateRequestUserFromTeamDto, @Req() request: Request) {
    dto.userId = request.user;
    return await this.teamService.dissociate(dto);
  }

  @Get('mine')
  @UseGuards(DefaultMiddleware)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'It should correctly return TeamUser',
    type: TeamUserResponseDto
  })
  async myTeam(@Req() request: Request) {
    const userId = request.user;
    return await this.teamService.findByPropertyAndValue('userId', userId);
  }


}
