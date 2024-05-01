import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserUseCase } from '../../usecases/user/add-user/add-user-usecase';
import { LoadAllUsersUseCase } from 'src/usecases/user/load-all-users/load-all-users-usecase';

/**
 * Controller responsible for handling user-related HTTP requests.
 */
@Controller('users')
export class UserController {
  /**
   * Creates an instance of UserController.
   * @param addUserUseCase Instance of the AddUserUseCase for adding users.
   * @param loadAllUsersUseCase Instance of the LoadAllUsersUseCase for loading all users.
   */
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly loadAllUsersUseCase: LoadAllUsersUseCase,
  ) {}

  /**
   * Handles HTTP POST request to create a new user.
   * @param dto The request body containing user data.
   * @returns A Promise that resolves to the result of the create operation.
   */
  @Post()
  async create(@Body() dto: any) {
    return await this.addUserUseCase.create(dto);
  }

  /**
   * Handles HTTP GET request to load all users.
   * @returns A Promise that resolves to the result of loading all users.
   */
  @Get()
  async load() {
    return await this.loadAllUsersUseCase.load();
  }
}
