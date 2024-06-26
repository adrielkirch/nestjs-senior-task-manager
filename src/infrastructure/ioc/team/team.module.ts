import { Module } from '@nestjs/common';
import { TeamController } from 'src/controllers/team/team.controller';
import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team.repository.interface';
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/teamUser.repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbTeamRepository } from 'src/infrastructure/database/mongodb/repositories/team/mongodb.team.repository';
import { MongodbTeamUserRepository } from 'src/infrastructure/database/mongodb/repositories/team_user/mongodb.teamUser.repository';
import { EmailServiceImpl } from 'src/infrastructure/notifier/email/email';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { PushNotificationServiceImpl } from 'src/infrastructure/notifier/push_notification/push.notification';
import { SmsServiceImpl } from 'src/infrastructure/notifier/sms/sms';
import { TeamService } from 'src/services/team/team.service';
import { AddTeamUseCase } from 'src/usecases/team/add.team.usecase';
import { FindByPropertyAndValueTeamsUseCase } from 'src/usecases/team/findByPropertyAndValue.team.usecase';
import { AddTeamUserUseCase } from 'src/usecases/team_user/add.teamUser.usecase';
import { DissociateTeamUserUseCase } from 'src/usecases/team_user/dissociate.teamUser.usecase';
import { FindByUserAndTeamUseCases } from 'src/usecases/team_user/findByUserIdAndTeamId.teamUser.usecase';

/**
 * The TeamModule is responsible for managing / inject team-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the TeamController to handle team-related HTTP requests.
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TeamService,
      useFactory: (
        teamRepo: TeamRepositoryInterface,
        teamUserRepo: TeamUserRepositoryInterface
      ) => {
        return new TeamService(
          new AddTeamUseCase(teamRepo),
          new FindByPropertyAndValueTeamsUseCase(teamRepo),
          new AddTeamUserUseCase(teamUserRepo),
          new FindByUserAndTeamUseCases(teamUserRepo),
          new DissociateTeamUserUseCase(teamUserRepo),
          NotifierService.getInstance(
            new EmailServiceImpl(),
            new SmsServiceImpl(),
            new PushNotificationServiceImpl()
          ),
        );
      },
      inject: [MongodbTeamRepository, MongodbTeamUserRepository],
    }
  ],
  controllers: [TeamController],
})
export class TeamModule {}
