import { User } from 'src/domain/user/user';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';

class MockUserRepository implements UserRepositoryInterface {
  create(data: User): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  update(data: User): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  login(data: User): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  find(): Promise<UserModel[]> {
    return Promise.resolve([]);
  }

  findPaginated(page: number, limit: number): Promise<UserModel[]> {
    return Promise.resolve([]);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<UserModel[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}

describe('UserRepositoryInterface', () => {
  let repository: UserRepositoryInterface;

  beforeEach(() => {
    repository = new MockUserRepository();
  });

  it('should create a new user', async () => {
    const user = User.create({
      name: "nanameme",
      surname: "surname",
      email: "email",
      password: "password",
      role: "role",
    });
    const result = await repository.create(user);
    expect(result).toBeDefined();
  });

  it('should update an existing user', async () => {
    const user = User.create({});
    const result = await repository.update(user);
    expect(result).toBeDefined();
  });

  it('should login an existing user', async () => {
    const user = User.create({
      name: "nanameme",
      surname: "surname",
      email: "email",
      password: "password",
      role: "role",
    });
    const result = await repository.login(user);
    expect(result).toBeDefined();
  });

  it('should find all users', async () => {
    const result = await repository.find();
    expect(result).toHaveLength(0);
  });

  it('should find users paginated', async () => {
    const page = 1;
    const limit = 10;
    const result = await repository.findPaginated(page, limit);
    expect(result).toHaveLength(0);
  });

  it('should find users by property and value', async () => {
    const property = "property";
    const value = "value";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });

  it('should find a user by its id', async () => {
    const userId = "123";
    const result = await repository.findById(userId);
    expect(result).toBeDefined();
  });

  it('should delete a user by its id', async () => {
    const userId = "123";
    await expect(repository.delete(userId)).resolves.not.toThrow();
  });
});
