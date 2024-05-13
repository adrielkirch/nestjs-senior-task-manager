import { Module } from "@nestjs/common";
import { TeamController } from "src/controllers/team/team.controller";
import { TeamRepositoryInterface } from "src/data/protocols/db/team/team-repository.interface";
import { TeamUserRepositoryInterface } from "src/data/protocols/db/team_user/team-user-repository.interface";
import { DatabaseModule } from "src/infrastructure/database/database.module";
import { MongodbTeamRepository } from "src/infrastructure/database/mongodb/repositories/team/mongodb-team-repository";
import { MongodbTeamUserRepository } from "src/infrastructure/database/mongodb/repositories/team_user/mongodb-team-user-repository";
import { TeamService } from "src/services/team/team.service";
import { AddTeamUseCase } from "src/usecases/team/add-team-usecase";
import { FindByPropertyAndValueTeamsUseCase } from "src/usecases/team/find-by-property-and-value-team-usecase";
import { AddTeamUserUseCase } from "src/usecases/team_user/add-team-user-usecase";
import { DissociateTeamUserUseCase } from "src/usecases/team_user/dissociate-team-user-usecase";
import { FindByUserAndTeam } from "src/usecases/team_user/find-by-userId-and-teamId-team-user-usecase";

/**
 * The TeamModule is responsible for managing / inject team-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the TeamController to handle team-related HTTP requests.
 * It
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
          new FindByUserAndTeam(teamUserRepo),
          new DissociateTeamUserUseCase(teamUserRepo)
        );
      },
      inject: [MongodbTeamRepository, MongodbTeamUserRepository],
    }
  ],
  controllers: [TeamController],
})
export class TeamModule {}
