import { Model } from 'mongoose';
import { MongodbProfileRepository } from 'src/infrastructure/database/mongodb/repositories/profile/mongodb-profile-repository';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';
import { Profile, ProfileProps } from 'src/domain/profile/profile';

const profileModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<ProfileModel>;


const profileProps: ProfileProps = {
  biography: 'Any biography',
  notifications: ['preference1', 'preference2'],
  gender: 'female',
  image: 'https://example.com/image.png',
  userId: '123',
};

describe('MongodbProfileRepository Unit Test', () => {
  let mongodbProfileRepository: MongodbProfileRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbProfileRepository = new MongodbProfileRepository(profileModelMock);
  });

  it('should be defined ', () => {
    expect(mongodbProfileRepository).toBeDefined();
  });

  it('should create new profile', async () => {

    const profile = Profile.create(profileProps);
    await mongodbProfileRepository.create(profile);
    expect(profileModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find a array the profiles', async () => {
    const profile = Profile.create(profileProps);
    await mongodbProfileRepository.create(profile);
    await mongodbProfileRepository.create(profile);
    await mongodbProfileRepository.create(profile);
    await mongodbProfileRepository.find();
    expect(profileModelMock.create).toHaveBeenCalledTimes(3);
    expect(profileModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should be call findById a profile by id', async () => {
    const profile = Profile.create(profileProps);
    await mongodbProfileRepository.create(profile);

    await mongodbProfileRepository.findById(profile.id);

    expect(profileModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should be call update a profile by id', async () => {
    const profile = Profile.create(profileProps);
    await mongodbProfileRepository.create(profile);

    await mongodbProfileRepository.update(profile);

    expect(profileModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should be call remove a profile by id', async () => {
    const profile = Profile.create(profileProps);
    await mongodbProfileRepository.create(profile);

    await mongodbProfileRepository.delete(profile.id);
    expect(profileModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
