import { UserService } from 'src/services/user/user.service';
import { AddUserUseCase } from 'src/usecases/user/add-user-usecase';
import { UpdateUserUseCase } from 'src/usecases/user/update-user-usecase';
import { FindByIdUsersUseCase } from 'src/usecases/user/find-by-id-users-usecase';
import { FindPaginatedUsersUseCase } from 'src/usecases/user/find-paginated-users-usecase';
import { FindByPropertyAndValueUsersUseCase } from 'src/usecases/user/find-by-property-and-value-user-usecase';
import { LoginUserUseCase } from 'src/usecases/user/login-user-usecase';
import { User } from 'src/domain/user/user';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';
import DateUtil from 'src/utils/util.date';


const newUser = {
    id: "123",
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    password: "My_Test_Password123!",
    role: "guest",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}
const newUserUpdated: UserModel = {
    _id: "123",
    id: "123",
    email: "john@doe.com",
    name: "John",
    surname: "Doe",
    password: "My_Test_Password123!",
    role: "guest",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:01"),
}


export class MockUserRepository implements UserRepositoryInterface {


    async login(user: User): Promise<UserModel | null> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }


    async create(data: User): Promise<UserModel> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }


    async find(): Promise<UserModel[]> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return [result]
    }


    async findById(id: string): Promise<UserModel> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<UserModel[]> {

        return []
    }


    async update(dataUpdate: User): Promise<UserModel> {
        return newUserUpdated
    }

    async findPaginated(page: number, limit: number): Promise<UserModel[]> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}


describe('UserService', () => {
    let userService: UserService;
    let addUserUseCase: AddUserUseCase;
    let updateUserUseCase: UpdateUserUseCase;
    let findByIdUsersUseCase: FindByIdUsersUseCase;
    let findPaginatedUsersUseCase: FindPaginatedUsersUseCase;
    let findByPropertyAndValueUsersUseCase: FindByPropertyAndValueUsersUseCase;
    let loginUserUseCase: LoginUserUseCase;

    beforeEach(() => {
        addUserUseCase = new AddUserUseCase(new MockUserRepository());
        updateUserUseCase = new UpdateUserUseCase(new MockUserRepository());

        findByIdUsersUseCase = new FindByIdUsersUseCase(new MockUserRepository());
        findPaginatedUsersUseCase = new FindPaginatedUsersUseCase(new MockUserRepository());
        findByPropertyAndValueUsersUseCase = new FindByPropertyAndValueUsersUseCase(new MockUserRepository());
        loginUserUseCase = new LoginUserUseCase(new MockUserRepository());

        userService = new UserService(
            addUserUseCase,
            updateUserUseCase,

            findByIdUsersUseCase,
            findPaginatedUsersUseCase,
            findByPropertyAndValueUsersUseCase,
            loginUserUseCase
        );
    });

    describe('create', () => {
        it('should create a new user', async () => {

            const expected = {
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                role: newUser.role,
            }
            const result = await userService.create(newUser);
            expect(result).toEqual(expected);
        });
    });
    describe('login', () => {
        it('should login an user', async () => {
            const data = {
                email: "john@doe.com",
                password: "123",
            }
            await userService.create(newUser);
            const result = await userService.login(data);
            expect(result.token.length).toEqual(143);
            expect(result.id).toEqual(newUser.id);
        });
    });


    describe('update', () => {
        it('should update an user', async () => {
            const data = {
                id: newUserUpdated.id,
                name: newUserUpdated.name,
                surname: newUserUpdated.surname,
                password: newUserUpdated.password,
                role: newUserUpdated.role,
            }
            const expected = {
                id: newUserUpdated.id,
                name: newUserUpdated.name,
                surname: newUserUpdated.surname,
                email: newUserUpdated.email,
                createdAt: newUserUpdated.createdAt,
                updatedAt: newUserUpdated.updatedAt,
                role: newUserUpdated.role,
            }

            await userService.create(newUser);
            const result = await userService.update(data);
            expect(result).toEqual(expected);
        });
    });

    describe('findById', () => {
        it('should find an user by id', async () => {
            const expected = {
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                role: newUser.role,
            }
            await userService.create(newUser);
            const result = await userService.findById(newUser.id);
            expect(result).toEqual(expected);
        });
    });

    describe('findPaginated', () => {
        it('should find paginated users', async () => {
            const expected = [{
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                role: newUser.role,
            }];
            const result = await userService.findPaginated(1, 1);
            expect(result).toEqual(expected);

        });
    });

    describe('findByFieldAndValue', () => {
        it('should find all users', async () => {
          
            const result = await userService.findByPropertyAndValue("email", "nonExistentEmail@test.com");
            expect(result).toBeNull()

        });
    });
});
