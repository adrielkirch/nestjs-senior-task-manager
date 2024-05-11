import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateRequestTeamDto,
  InviteRequestTeamDto,
  JoinRequestTeamDto,
} from "src/adapters/request/team.request.dto";
import { AddTeamUseCase } from "src/usecases/team/add-team-usecase";
import { FindByPropertyAndValueTeamsUseCase } from "src/usecases/team/find-by-property-and-value-team-usecase";
import { Team } from "src/domain/team/team";
import {
  InviteResponseDto,
  TeamResponseDto,
} from "src/adapters/response/team.response.dto";
import { SecurityUtil } from "src/utils/util.security";
import { AddTeamUserUseCase } from "src/usecases/team_user/add-team-user-usecase";
import { TeamUser } from "src/domain/team_user/team-user";
import { TeamUserResponseDto } from "src/adapters/response/team-user.response.dto";

@Injectable()
export class TeamService {
  constructor(
    private readonly addTeamUseCase: AddTeamUseCase,
    private readonly findByPropertyAndValueTeamsUseCase: FindByPropertyAndValueTeamsUseCase,
    private readonly addTeamUserUseCase: AddTeamUserUseCase
  ) {}

  async create(data: CreateRequestTeamDto): Promise<TeamResponseDto> {
    const existingTeamUserId = await this.findByPropertyAndValue(
      "userId",
      data.userId
    );

    if (existingTeamUserId && existingTeamUserId.length > 0) {
      throw new ConflictException("Team with this userId already exists");
    }

    const team = Team.create(data);
    console.log(team)
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
    const team = Team.create(data);

    const existingTeam = await this.findByPropertyAndValue(
      "userId",
      data.userId
    );

    if (existingTeam && existingTeam.length == 0) {
      throw new NotFoundException("Team with this userId do not exists");
    }

    const seed = {
      email: data.email,
      teamId: existingTeam[0].id,
    };

    const jsonWebToken = SecurityUtil.generateJsonwebtoken(seed);

    return {
      token: jsonWebToken,
    } as InviteResponseDto;
  }

  async join(data: JoinRequestTeamDto): Promise<TeamUserResponseDto> {
    const decodedJsonWebToken = SecurityUtil.decodedJsonwebtoken(data.token);

    if (!decodedJsonWebToken["email"] || !decodedJsonWebToken["teamId"]) {
      throw new NotFoundException("Team with this userId do not exists");
    }

    const existingTeam = await this.findByPropertyAndValue(
      "userId",
      decodedJsonWebToken["teamId"]
    );

    if (existingTeam && existingTeam.length == 0) {
      throw new NotFoundException("Team with this id do not exists");
    }
    
    console.log(data.userId)

    const teamUser = TeamUser.create({
      userId: data.userId,
      teamId: decodedJsonWebToken["teamId"],
    });

    const teamUserResponseDto = await this.addTeamUserUseCase.create(teamUser);
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
}
