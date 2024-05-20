import { ProfileService } from 'src/services/profile/profile.service';
import { AddProfileUseCase } from 'src/usecases/profile/add.profile.usecase';
import { UpdateProfileUseCase } from 'src/usecases/profile/update.profile.usecase';
import { FindByIdProfilesUseCase } from 'src/usecases/profile/findById.profile.usecase';
import { FindPaginatedProfilesUseCase } from 'src/usecases/profile/findPaginated.profile.usecase';
import { FindByPropertyAndValueProfileUseCase } from 'src/usecases/profile/findByPropertyAndValue.profile.usecase';

import { Profile } from 'src/domain/profile/profile';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';
import DateUtil from 'src/utils/util.date';

const newProfile = {
    biography: 'Any biography',
    notifications: ['preference1', 'preference2'],
    gender: 'female',
    image: 'https://example.com/image.png',
    userId: '123',
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}
const newProfileUpdated: ProfileModel = {
    _id: "123",
    id: "123",
    biography: 'Any biography',
    notifications: ['preference1', 'preference2'],
    gender: 'female',
    image: 'https://example.com/image.png',
    userId: '123',
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
} as ProfileModel;

export class MockProfileRepository implements ProfileRepositoryInterface {
    async login(profile: Profile): Promise<ProfileModel | null> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async create(data: Profile): Promise<ProfileModel> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async findById(id: string): Promise<ProfileModel> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<ProfileModel[]> {
        return []
    }

    async update(dataUpdate: Profile): Promise<ProfileModel> {
        return newProfileUpdated
    }

    async findPaginated(page: number, limit: number): Promise<ProfileModel[]> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}


describe('ProfileService', () => {
    let profileService: ProfileService;
    let addProfileUseCase: AddProfileUseCase;
    let updateProfileUseCase: UpdateProfileUseCase;
    let findByIdProfilesUseCase: FindByIdProfilesUseCase;
    let findPaginatedProfilesUseCase: FindPaginatedProfilesUseCase;
    let findByPropertyAndValueProfilesUseCase: FindByPropertyAndValueProfileUseCase;

    beforeEach(() => {
        addProfileUseCase = new AddProfileUseCase(new MockProfileRepository());
        updateProfileUseCase = new UpdateProfileUseCase(new MockProfileRepository());

        findByIdProfilesUseCase = new FindByIdProfilesUseCase(new MockProfileRepository());
        findPaginatedProfilesUseCase = new FindPaginatedProfilesUseCase(new MockProfileRepository());
        findByPropertyAndValueProfilesUseCase = new FindByPropertyAndValueProfileUseCase(new MockProfileRepository());


        profileService = new ProfileService(
            addProfileUseCase,
            updateProfileUseCase,

            findByIdProfilesUseCase,
            findPaginatedProfilesUseCase,
            findByPropertyAndValueProfilesUseCase,
        );
    });

    describe('create', () => {
        it('should create a new profile', async () => {

            const expected = {
                id: "123",
                biography: newProfile.biography,
                notifications: newProfile.notifications,
                gender: newProfile.gender,
                image: newProfile.image,
                userId: newProfile.userId,
                createdAt: newProfile.createdAt,
                updatedAt: newProfile.updatedAt,
            }
            const result = await profileService.create(newProfile);
            expect(result).toEqual(expected);
        });
    });



    describe('update', () => {
        it('should update an profile', async () => {
            const data = {
                id: "123",
                biography: newProfileUpdated.biography,
                notifications: newProfileUpdated.notifications,
                gender: newProfileUpdated.gender,
                image: newProfileUpdated.image,
                userId: newProfileUpdated.userId,
                createdAt: newProfileUpdated.createdAt,
                updatedAt: newProfileUpdated.updatedAt,
            }
            const expected = {
                id: newProfileUpdated.id,
                biography: newProfileUpdated.biography,
                notifications: newProfileUpdated.notifications,
                gender: newProfileUpdated.gender,
                image: newProfileUpdated.image,
                userId: newProfileUpdated.userId,
                createdAt: newProfileUpdated.createdAt,
                updatedAt: newProfileUpdated.updatedAt,
            }

            await profileService.create(newProfile);
            const result = await profileService.update(data);
            expect(result).toEqual(expected);
        });
    });

    describe('findById', () => {
        it('should find an profile by id', async () => {
            const expected = {
                id: newProfileUpdated.id,
                biography: newProfile.biography,
                notifications: newProfile.notifications,
                gender: newProfile.gender,
                image: newProfile.image,
                userId: newProfile.userId,
                createdAt: newProfile.createdAt,
                updatedAt: newProfile.updatedAt,
            }
            await profileService.create(newProfile);
            const result = await profileService.findById('123');
            expect(result).toEqual(expected);
        });
    });

    describe('findPaginated', () => {
        it('should find paginated profiles', async () => {
            const expected = [{
                id: newProfileUpdated.id,
                biography: newProfile.biography,
                notifications: newProfile.notifications,
                gender: newProfile.gender,
                image: newProfile.image,
                userId: newProfile.userId,
                createdAt: newProfile.createdAt,
                updatedAt: newProfile.updatedAt,
            }];
            const result = await profileService.findPaginated(1, 1);
            expect(result).toEqual(expected);

        });
    });

    describe('findByFieldAndValue', () => {
        it('should find all profiles', async () => {

            const result = await profileService.findByPropertyAndValue("email", "nonExistentEmail@test.com");
            expect(result).toBeNull()

        });
    });
});
