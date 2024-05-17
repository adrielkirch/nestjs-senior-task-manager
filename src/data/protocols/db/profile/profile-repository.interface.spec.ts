import { Profile } from 'src/domain/profile/profile';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';

class MockProfileRepository implements ProfileRepositoryInterface {
  create(data: Profile): Promise<ProfileModel> {
    return Promise.resolve({} as ProfileModel);
  }

  update(data: Profile): Promise<ProfileModel> {
    return Promise.resolve({} as ProfileModel);
  }

  findPaginated(page: number, limit: number): Promise<ProfileModel[]> {
    return Promise.resolve([]);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<ProfileModel[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<ProfileModel> {
    return Promise.resolve({} as ProfileModel);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}

describe('ProfileRepositoryInterface', () => {
  let repository: ProfileRepositoryInterface;

  beforeEach(() => {
    repository = new MockProfileRepository();
  });

  it('should create a new profile', async () => {
    const profile = Profile.create({
      biography: "lorem ipsum dolor sit amet",
      gender: "female",
      notifications: ["email","sms"],
      image: "https://image.com",
     
    });
    const result = await repository.create(profile);
    expect(result).toBeDefined();
  });

  it('should update an existing profile', async () => {
    const profile = Profile.create({});
    const result = await repository.update(profile);
    expect(result).toBeDefined();
  });


  it('should find profiles paginated', async () => {
    const page = 1;
    const limit = 10;
    const result = await repository.findPaginated(page, limit);
    expect(result).toHaveLength(0);
  });

  it('should find profiles by property and value', async () => {
    const property = "property";
    const value = "value";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });

  it('should find a profile by its id', async () => {
    const profileId = "123";
    const result = await repository.findById(profileId);
    expect(result).toBeDefined();
  });

  it('should delete a profile by its id', async () => {
    const profileId = "123";
    await expect(repository.delete(profileId)).resolves.not.toThrow();
  });
});
