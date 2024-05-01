import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbUserRepository } from 'src/infrastructure/database/mongodb/repositories/user/mongodb-user-repository';
import { UserService } from 'src/services/service.user';
import { AddUserUseCase } from 'src/usecases/user/add-user-usecase';
import { FindByIdUsersUseCase } from 'src/usecases/user/find-by-id-users-usecase';
import { LoadAllUsersUseCase } from 'src/usecases/user/load-all-users-usecase';
import { LoginUserUseCase } from 'src/usecases/user/login-user-usecase';

/**
 * The UserModule is responsible for managing / inject user-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the UserController to handle user-related HTTP requests.
 * It  
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserService,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new UserService(
          new AddUserUseCase(userRepo),
          new LoadAllUsersUseCase(userRepo),
          new FindByIdUsersUseCase(userRepo),
          new LoginUserUseCase(userRepo),
        );
      },
      inject: [MongodbUserRepository],
    },
    
  ],
  controllers: [UserController],
})
export class UserModule { }
