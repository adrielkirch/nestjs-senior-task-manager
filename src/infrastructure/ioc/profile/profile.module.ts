import { Module } from '@nestjs/common';
import { ProfileController } from 'src/controllers/profile/profile.controller';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbProfileRepository } from 'src/infrastructure/database/mongodb/repositories/profile/mongodb.profile.repository';
import { ProfileService } from 'src/services/profile/profile.service';
import { AddProfileUseCase } from 'src/usecases/profile/add.profile.usecase';
import { FindByIdProfilesUseCase } from 'src/usecases/profile/findById.profile.usecase';
import { FindByPropertyAndValueProfileUseCase } from 'src/usecases/profile/findByPropertyAndValue.profile.usecase';
import { FindPaginatedProfilesUseCase } from 'src/usecases/profile/findPaginated.profile.usecase';
import { UpdateProfileUseCase } from 'src/usecases/profile/update.profile.usecase';

/**
 * The ProfileModule is responsible for managing / inject profile-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the ProfileController to handle profile-related HTTP requests. 
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ProfileService,
      useFactory: (profileRepo: ProfileRepositoryInterface) => {
        return new ProfileService(
          new AddProfileUseCase(profileRepo),
          new UpdateProfileUseCase(profileRepo),
          new FindByIdProfilesUseCase(profileRepo),
          new FindPaginatedProfilesUseCase(profileRepo),
          new FindByPropertyAndValueProfileUseCase(profileRepo),
         
        );
      },
      inject: [MongodbProfileRepository],
    },
    
  ],
  controllers: [ProfileController],
})
export class ProfileModule { }
