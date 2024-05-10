import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestUserDto, LoginRequestDto, UpdateRequestUserDto } from 'src/adapters/request/user.request.dto';
import { AddUserUseCase } from 'src/usecases/user/add-user-usecase';
import { FindByIdUsersUseCase } from 'src/usecases/user/find-by-id-users-usecase';
import { FindByPropertyAndValueUsersUseCase } from 'src/usecases/user/find-by-property-and-value-user-usecase';
import { LoginUserUseCase } from 'src/usecases/user/login-user-usecase';
import { SecurityUtil } from 'src/utils/util.security';
import { FindPaginatedUsersUseCase } from 'src/usecases/user/find-paginated-users-usecase';
import { UpdateUserUseCase } from 'src/usecases/user/update-user-usecase';
import { LoginResponseDto, UserResponseDto } from 'src/adapters/response/user.response.dto';
import { User } from 'src/domain/user/user';

@Injectable()
export class UserService {
    constructor(
        private readonly addUserUseCase: AddUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly findByIdUsersUseCase: FindByIdUsersUseCase,
        private readonly findPaginatedUsersUseCase: FindPaginatedUsersUseCase,
        private readonly findByPropertyAndValueUsersUseCase: FindByPropertyAndValueUsersUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    async create(data: CreateRequestUserDto): Promise<UserResponseDto> {
        const existingUsers = await this.findByPropertyAndValue("email", data.email);

        if (existingUsers && existingUsers.length > 0) {
            throw new Error('User with this email already exists');
        }

        const hashPassword = SecurityUtil.generateHashWithSalt(data.password);
        data.password = hashPassword;
        data.role = "guest";
        const user = User.create(data);
      
        return await this.addUserUseCase.create(user);
    }

    async update(data: UpdateRequestUserDto): Promise<UserResponseDto> {
        const existingUser = await this.findById(data.id);

        if (!existingUser) {
            throw new NotFoundException('User does not exist');
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null) {
                    delete data[key];
                }
            }
        }

        if (data.password) {
            const hashPassword = SecurityUtil.generateHashWithSalt(data.password);
            data.password = hashPassword;
        }
        const user = User.create(data,existingUser.id);
        return await this.updateUserUseCase.update(user);
    }

    async login(data: LoginRequestDto): Promise<LoginResponseDto> {
        const hashPassword = SecurityUtil.generateHashWithSalt(data.password);
        data.password = hashPassword;
        const user = User.create(data);
        const userLogin = await this.loginUserUseCase.login(user);

        if (!userLogin) {
            throw new NotFoundException('E-mail or password incorrect(s)');
        }
        const id = userLogin.id;
        const token = SecurityUtil.generateJsonwebtoken(userLogin.id, userLogin.role);

        return {
            token,
            id
        } as LoginResponseDto;
    }

    async findById(id: string): Promise<UserResponseDto> {
        const user = await this.findByIdUsersUseCase.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

   
    async findPaginated(page: number, limit: number): Promise<UserResponseDto[]> {
        return await this.findPaginatedUsersUseCase.findPaginated(page, limit);
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<UserResponseDto[]> {
        return await this.findByPropertyAndValueUsersUseCase.findByPropertyAndValue(property, value);
    }

}
