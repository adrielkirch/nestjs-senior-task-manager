import { TeamService } from 'src/services/team/team.service';
import { AddTeamUseCase } from 'src/usecases/team/add.team.usecase';
import { FindByPropertyAndValueTeamsUseCase } from 'src/usecases/team/findByPropertyAndValue.team.usecase';
import { Team } from 'src/domain/team/team';
import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team.repository.interface';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/teamUser.repository.interface';
import { TeamUser } from 'src/domain/team_user/teamUser';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/teamUser.model';
import { AddTeamUserUseCase } from 'src/usecases/team_user/add.teamUser.usecase';
import { FindByUserAndTeamUseCases } from 'src/usecases/team_user/findByUserIdAndTeamId.teamUser.usecase';
import { DissociateTeamUserUseCase } from 'src/usecases/team_user/dissociate.teamUser.usecase';
import { CreateRequestTeamDto, InviteRequestTeamDto } from 'src/adapters/request/team.request.dto';
import DateUtil from 'src/utils/util.date';
import * as crypto from "crypto";

const newTeam = {
    id: "123",
    name: "Test",
    userId: "321",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}

const newTeamDto: CreateRequestTeamDto = {
    name: "Test",
    userId: "321"
} as CreateRequestTeamDto;

const newTeamUser = {
    id:"12345",
    userId: "ef8d8e2a-e694-4ccd-93ca-7a067de26777",
    teamId: "138b4c28-c283-482e-9e7e-d8781c77706c",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}

const joinUserRequestDto = {
    id:"12345",
    userId: "ef8d8e2a-e694-4ccd-93ca-7a067de26777",
    teamId: "138b4c28-c283-482e-9e7e-d8781c77706c",
    token:"",
    email: "test2@example.com",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}

const inviteRequestTeamDto: InviteRequestTeamDto = {
    email: "test2@example.com",
    userId:  crypto.randomUUID().toString(),
} as InviteRequestTeamDto;

export class MockTeamRepository implements TeamRepositoryInterface {

    async create(data: Team): Promise<TeamModel> {
        const result: TeamModel = {
            _id: "123",
            ...newTeam
        } as TeamModel;
        return result;
    }


    async findByPropertyAndValue<T>(property: string, value: T): Promise<TeamModel[]> {
        return []
    }


}

export class MockTeamUserRepository implements TeamUserRepositoryInterface {

    async create(data: TeamUser): Promise<TeamUserModel> {
        const result: TeamUserModel = {
            _id: "12345",
            ...newTeamUser
        } as TeamUserModel;
        return result;
    }


    async findByPropertyAndValue<T>(property: string, value: T): Promise<TeamUserModel[]> {
        return [];
    }

    async findByUserAndTeam(userId: string, teamId: string): Promise<TeamUserModel[]> {
        return [];
    }

    async dissociate(data: TeamUser): Promise<TeamUserModel> {
        const result: TeamUserModel = {
            _id: "12345",
            ...newTeamUser
        } as TeamUserModel;
        return result;
    }

}

describe('TeamService', () => {
    let teamService: TeamService;
    let addTeamUseCase: AddTeamUseCase;
    let findByPropertyAndValueTeamsUseCase: FindByPropertyAndValueTeamsUseCase;
    let addTeamUserUseCase: AddTeamUserUseCase;
    let findByUserAndTeam: FindByUserAndTeamUseCases;
    let dissociateTeamUserUseCase: DissociateTeamUserUseCase;



    beforeEach(() => {
        addTeamUseCase = new AddTeamUseCase(new MockTeamRepository());
        findByPropertyAndValueTeamsUseCase = new FindByPropertyAndValueTeamsUseCase(new MockTeamRepository())
        addTeamUserUseCase = new AddTeamUserUseCase(new MockTeamUserRepository())
        findByUserAndTeam =  new FindByUserAndTeamUseCases(new MockTeamUserRepository())
        dissociateTeamUserUseCase =  new DissociateTeamUserUseCase(new MockTeamUserRepository())
        teamService = new TeamService(
            addTeamUseCase,
            findByPropertyAndValueTeamsUseCase,
            addTeamUserUseCase,
            findByUserAndTeam,
            dissociateTeamUserUseCase
        );


    });

    describe('create', () => {
        it('should create a new team', async () => {
            const result = await teamService.create(newTeamDto as CreateRequestTeamDto);
            const expected = newTeam;
            expect(result).toEqual(expected);
        });
    });

    describe('invite', () => {
        it('should invite a new team user', async () => {
            const result = await teamService.invite(inviteRequestTeamDto as InviteRequestTeamDto);
            expect(result.token.length).toEqual(143);
            
        });
    });

    describe('join', () => {
        it('should join a new team user', async () => {
            const result1 = await teamService.create(newTeamDto as CreateRequestTeamDto);
            const expected = newTeam;
            expect(result1).toEqual(expected);

            inviteRequestTeamDto.teamId = result1.id;
            const result2 = await teamService.invite(inviteRequestTeamDto as InviteRequestTeamDto);
          
            expect(result2.token.length).toBeLessThanOrEqual(163);
            expect(result2.token.length).toBeGreaterThanOrEqual(143);
            joinUserRequestDto.token = result2.token;
            const result3 = await teamService.join(joinUserRequestDto);
            expect(result3.id).toEqual("12345");
         
        });
    });


    describe('dissociate', () => {
        it('should join a new team user', async () => {
            const result1 = await teamService.create(newTeamDto as CreateRequestTeamDto);
            const expected = newTeam;
            expect(result1).toEqual(expected);

            inviteRequestTeamDto.teamId = result1.id;
            const result2 = await teamService.invite(inviteRequestTeamDto as InviteRequestTeamDto);
          
            expect(result2.token.length).toBeLessThanOrEqual(163);
            expect(result2.token.length).toBeGreaterThanOrEqual(143);
            joinUserRequestDto.token = result2.token;
            const result3 = await teamService.join(joinUserRequestDto);
            expect(result3.id).toEqual("12345");
            const result4 = await teamService.dissociate(joinUserRequestDto);
            expect(result4.id).toEqual("12345");
         
        });
    });

});
