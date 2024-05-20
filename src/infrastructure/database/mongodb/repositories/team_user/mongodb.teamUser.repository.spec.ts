import { Model } from 'mongoose';
import { MongodbTeamUserRepository } from 'src/infrastructure/database/mongodb/repositories/team_user/mongodb.teamUser.repository';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/teamUser.model';
import { TeamUser } from 'src/domain/team_user/teamUser';

const teamModelMock = {
  create: jest.fn(),
  find: jest.fn(),
} as unknown as Model<TeamUserModel>;

const teamData = {
  userId: '1235',
  teamId: '1234',
  description: 'Test team description',
};

describe('MongodbTeamRepository Unit Test', () => {
  let mongodbTeamUserRepository: MongodbTeamUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbTeamUserRepository = new MongodbTeamUserRepository(teamModelMock);
  });

  it('should be defined', () => {
    expect(mongodbTeamUserRepository).toBeDefined();
  });

  it('should create a new team', async () => {
    await mongodbTeamUserRepository.create( TeamUser.create(teamData));
    expect(teamModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find teams by property and value', async () => {
    const propertyName = 'name';
    const propertyValue = 'Test Team';

    await mongodbTeamUserRepository.findByPropertyAndValue(propertyName, propertyValue);
    expect(teamModelMock.find).toHaveBeenCalledWith({ [propertyName]: propertyValue });
  });
});
