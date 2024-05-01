import { Injectable } from '@nestjs/common';
import { AddUserUseCase } from 'src/usecases/user/add-user-usecase';
import { FindByIdUsersUseCase } from 'src/usecases/user/find-by-id-users-usecase';
import { LoadAllUsersUseCase } from 'src/usecases/user/load-all-users-usecase';
import { LoginUserUseCase } from 'src/usecases/user/login-user-usecase';


@Injectable()
export class UserService {
    constructor(
        private readonly addUserUseCase: AddUserUseCase,
        private readonly loadAllUsersUseCase: LoadAllUsersUseCase,
        private readonly findByIdUsersUseCase: FindByIdUsersUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) {}
    async create(dto: any) {
        return await this.addUserUseCase.create(dto);
    }

    async login(dto: any) {
        return await this.loginUserUseCase.login(dto);
    }

    async load() {
        return await this.loadAllUsersUseCase.load();
    }

    async findById(id: string) {
        return await this.findByIdUsersUseCase.findById(id);
    }
}
