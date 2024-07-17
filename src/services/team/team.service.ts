import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateRequestTeamDto,
  DissociateRequestUserFromTeamDto,
  InviteRequestTeamDto,
  JoinRequestTeamDto,
} from 'src/adapters/request/team.request.dto';
import { AddTeamUseCase } from 'src/usecases/team/add.team.usecase';
import { FindByPropertyAndValueTeamsUseCase } from 'src/usecases/team/findByPropertyAndValue.team.usecase';
import { Team } from 'src/domain/team/team';
import {
  InviteResponseDto,
  TeamResponseDto,
} from 'src/adapters/response/team.response.dto';
import { SecurityUtil } from 'src/utils/util.security';
import { AddTeamUserUseCase } from 'src/usecases/team_user/add.teamUser.usecase';
import { TeamUser } from 'src/domain/team_user/teamUser';
import { TeamUserResponseDto } from 'src/adapters/response/teamUser.response.dto';
import { DissociateTeamUserUseCase } from 'src/usecases/team_user/dissociate.teamUser.usecase';
import { FindByUserAndTeamUseCases } from 'src/usecases/team_user/findByUserIdAndTeamId.teamUser.usecase';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { FRONT_END_HOST } from 'src/config';

@Injectable()
export class TeamService {
  constructor(
    private readonly addTeamUseCase: AddTeamUseCase,
    private readonly findByPropertyAndValueTeamsUseCase: FindByPropertyAndValueTeamsUseCase,
    private readonly addTeamUserUseCase: AddTeamUserUseCase,
    private readonly findByUserAndTeamUseCase: FindByUserAndTeamUseCases,
    private readonly dissociateTeamUserUseCase: DissociateTeamUserUseCase,
    private readonly notifierService: NotifierService,
  ) { }

  async create(data: CreateRequestTeamDto): Promise<TeamResponseDto> {

    const existingTeamUserId = await this.findByPropertyAndValue(
      'userId',
      data.userId
    );

    if (existingTeamUserId && existingTeamUserId.length > 0) {
      throw new ConflictException('Team with this userId already exists');
    }

    const team = Team.create(data);
    const teamResponse = await this.addTeamUseCase.create(team);
    const teamUserRequestDto = {
      userId: data.userId,
      teamId: team.id,
    };

    const teamUser = TeamUser.create(teamUserRequestDto);
    this.addTeamUserUseCase.create(teamUser);

    return teamResponse;
  }

  async invite(data: InviteRequestTeamDto): Promise<InviteResponseDto> {

    let existingTeam = await this.findByPropertyAndValue(
      '_id',
      data['teamId']
    )

    if (existingTeam && existingTeam.length == 0) {
      throw new NotFoundException('Team with this Id do not exists');
    }

    existingTeam = await this.findByUserIdAndTeamId(
      data.userId,
      data.teamId
    )

    if (existingTeam && existingTeam.length > 0) {
      throw new ConflictException('Team with this UserId already exists');
    }

    const jsonWebToken = SecurityUtil.generateJsonwebtoken({
      email: data.email,
      teamId: data.teamId,
    }, '1h')

    const notificationData = {
      message: `<b>You're invite to join task manager team:</b><br><a href="${FRONT_END_HOST}/invite?token=${jsonWebToken}">Click here to join</a>`,
      subject: `Invitation to task manager team`,
      recipients: [data.email]
    }

    this.notifierService.onNotify('email', notificationData);
    this.notifierService.emitNotifyEvent('onNotify');

    return {
      token: jsonWebToken,
    } as InviteResponseDto;
  }

  async join(data: JoinRequestTeamDto): Promise<TeamUserResponseDto> {
    const decodedJsonWebToken = SecurityUtil.decodedJsonwebtoken(data.token);

    console.log(decodedJsonWebToken)

    if (!decodedJsonWebToken['email'] || !decodedJsonWebToken['teamId']) {
      throw new NotFoundException('Invalid token');
    }

    let existingTeam = await this.findByPropertyAndValue(
      '_id',
      decodedJsonWebToken['teamId']
    )
    if (existingTeam && existingTeam.length == 0) {
      throw new NotFoundException('Team with this Id do not exists');
    }

    existingTeam = await this.findByUserIdAndTeamId(
      data['userId'],
      decodedJsonWebToken['teamId']
    )

    if (existingTeam && existingTeam.length > 0) {
      throw new ConflictException('Team with this UserId already exists');
    }


    const teamUser = TeamUser.create({
      userId: data['userId'],
      teamId: decodedJsonWebToken['teamId'],
    });

    const teamUserResponseDto = await this.addTeamUserUseCase.create(teamUser);
    return teamUserResponseDto;
  }


  async dissociate(data: DissociateRequestUserFromTeamDto): Promise<TeamUserResponseDto> {
    let existingTeam = await this.findByPropertyAndValue(
      '_id',
      data['teamId']
    )
    if (existingTeam && existingTeam.length == 0) {
      throw new NotFoundException('Team with this Id do not exists');
    }

    existingTeam = await this.findByUserIdAndTeamId(
      data['userId'],
      data['teamId']
    )

    if (existingTeam && existingTeam.length > 0) {
      throw new ConflictException('Team with this UserId already exists');
    }

    const teamUser = TeamUser.create({
      userId: data['userId'],
      teamId: data['teamId'],
    });

    const teamUserResponseDto = await this.dissociateTeamUserUseCase.dissociate(teamUser);
    return teamUserResponseDto;

  }


  async findByPropertyAndValue<T>(
    property: string,
    value: T
  ): Promise<TeamResponseDto[]> {
    return await this.findByPropertyAndValueTeamsUseCase.findByPropertyAndValue(
      property,
      value
    );
  }

  async findByUserIdAndTeamId(
    userId: string,
    teamId: string,
  ): Promise<TeamResponseDto[]> {
    return await this.findByUserAndTeamUseCase.findByUserAndTeam(
      userId,
      teamId,
    );
  }
}
