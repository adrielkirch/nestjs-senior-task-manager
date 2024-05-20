import { Team } from 'src/domain/team/team';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';
import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team.repository.interface';

class MockTeamRepository implements TeamRepositoryInterface {
  create(data: Team): Promise<TeamModel> {
    return Promise.resolve({} as TeamModel);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<TeamModel[]> {
    return Promise.resolve([]); 
  }
}

describe('TeamRepositoryInterface', () => {
  let repository: TeamRepositoryInterface;

  beforeEach(() => {
    repository = new MockTeamRepository();
  });

  it('should create a new team', async () => {
    const team = Team.create({
      name:"test",
      userId:"123"
    })
    const result = await repository.create(team);
    expect(result).toBeDefined();
  });

  it('should find teams by property and value', async () => {
    const property = "property";
    const value = "value";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });
});
