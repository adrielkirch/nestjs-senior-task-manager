import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongodbModule } from "src/infrastructure/database/mongodb/mongodb.module";
import {
  UserModel,
  UserSchema,
} from "src/infrastructure/database/mongodb/models/user/user.model";
import { MongodbUserRepository } from "src/infrastructure/database/mongodb/repositories/user/mongodb-user-repository";
import { MongodbTaskRepository } from "src/infrastructure/database/mongodb/repositories/task/mongodb-task-repository";
import { MongodbTeamRepository } from "src/infrastructure/database/mongodb/repositories/team/mongodb-team-repository";
import {
  TaskModel,
  TaskSchema,
} from "src/infrastructure/database/mongodb/models/task/task.model";
import { TeamModel, TeamSchema } from "./mongodb/models/team/team.model";
import {
  TeamUserModel,
  TeamUserSchema,
} from "src/infrastructure/database/mongodb/models/team_user/team-user.model";
import { MongodbTeamUserRepository } from "./mongodb/repositories/team_user/mongodb-team-user-repository";

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
      {
        name: TaskModel.name,
        schema: TaskSchema,
      },
      {
        name: TeamModel.name,
        schema: TeamSchema,
      },
      {
        name: TeamUserModel.name,
        schema: TeamUserSchema,
      },
    ]),
  ],
  exports: [
    MongodbUserRepository,
    MongodbTaskRepository,
    MongodbTeamRepository,
    MongodbTeamUserRepository,
    MongodbModule,
  ],
  providers: [
    MongodbUserRepository,
    MongodbTaskRepository,
    MongodbTeamRepository,
    MongodbTeamUserRepository,
  ],
})
export class DatabaseModule {}
