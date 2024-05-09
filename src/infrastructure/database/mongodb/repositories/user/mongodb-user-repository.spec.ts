import { Model } from 'mongoose';
import { MongodbUserRepository } from 'src/infrastructure/database/mongodb/repositories/user/mongodb-user-repository';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';
import { User, UserProps } from 'src/domain/user/user';

const userModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<UserModel>;

const userProps: UserProps = {
  name: 'any_name',
  surname: 'any_surname',
  email: 'any_email@mail.com',
  password: 'any_pass',
  role: 'admin',
};

describe('MongodbUserRepository Unit Test', () => {
  let mongodbUserRepository: MongodbUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbUserRepository = new MongodbUserRepository(userModelMock);
  });

  it('should be defined ', () => {
    expect(mongodbUserRepository).toBeDefined();
  });

  it('should create new user', async () => {

    const user = User.create(userProps);
    await mongodbUserRepository.create(user);
    expect(userModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find a array the users', async () => {
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);
    await mongodbUserRepository.create(user);
    await mongodbUserRepository.create(user);
    await mongodbUserRepository.find();
    expect(userModelMock.create).toHaveBeenCalledTimes(3);
    expect(userModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should be call findById a user by id', async () => {
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.findById(user.id);

    expect(userModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should be call update a user by id', async () => {
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.update(user);

    expect(userModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should be call remove a user by id', async () => {
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.remove(user.id);
    expect(userModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
