import { Model } from 'mongoose';
import { MongodbTeamRepository } from 'src/infrastructure/database/mongodb/repositories/team/mongodb.team.repository';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';
import { Team } from 'src/domain/team/team';

const teamModelMock = {
  create: jest.fn(),
  find: jest.fn(),
} as unknown as Model<TeamModel>;

const teamData = {
  name: 'Test Team',
  description: 'Test team description',
};

describe('MongodbTeamRepository Unit Test', () => {
  let mongodbTeamRepository: MongodbTeamRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbTeamRepository = new MongodbTeamRepository(teamModelMock);
  });

  it('should be defined', () => {
    expect(mongodbTeamRepository).toBeDefined();
  });

  it('should create a new team', async () => {
    await mongodbTeamRepository.create(Team.create(teamData));
    expect(teamModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find teams by property and value', async () => {
    const propertyName = 'name';
    const propertyValue = 'Test Team';

    await mongodbTeamRepository.findByPropertyAndValue(propertyName, propertyValue);
    expect(teamModelMock.find).toHaveBeenCalledWith({ [propertyName]: propertyValue });
  });
});
