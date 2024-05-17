import { TeamUser } from 'src/domain/team_user/team-user';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/team-user.model'; 
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/team-user-repository.interface';

class MockTeamUserRepository implements TeamUserRepositoryInterface {
  create(data: TeamUser): Promise<TeamUserModel> {
    return Promise.resolve({} as TeamUserModel);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<TeamUserModel[]> {
    return Promise.resolve([]); 
  }

  findByUserAndTeam(userId: string, teamId: string): Promise<TeamUserModel[]> {
    return Promise.resolve([]); 
  }

  dissociate(data: TeamUser): Promise<TeamUserModel> {
    return Promise.resolve({} as TeamUserModel);
  }
}

describe('TeamUserRepositoryInterface', () => {
  let repository: TeamUserRepositoryInterface;

  beforeEach(() => {
    repository = new MockTeamUserRepository();
  });

  it('should create a new team user', async () => {
    const teamUser = TeamUser.create({
      userId: "321",
      teamId: "123",
    });
    const result = await repository.create(teamUser);
    expect(result).toBeDefined();
  });

  it('should find team users by property and value', async () => {
    const property = "property";
    const value = "value";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });

  it('should find team users by user and team', async () => {
    const userId = "userId";
    const teamId = "teamId";
    const result = await repository.findByUserAndTeam(userId, teamId);
    expect(result).toHaveLength(0);
  });

  it('should dissociate a team user', async () => {
    const teamUser = TeamUser.create({
      userId: "321",
      teamId: "123",
    });
    const result = await repository.dissociate(teamUser);
    expect(result).toBeDefined();
  });
});
