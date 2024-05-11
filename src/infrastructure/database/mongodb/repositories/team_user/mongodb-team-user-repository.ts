import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TeamUserRepositoryInterface } from "src/data/protocols/db/team_user/team-user-repository.interface";
import { TeamUserModel } from "../../models/team_user/team-user.model";
import { TeamUser } from "src/domain/team_user/team-user";

/**
 * Repository implementation for MongoDB database.
 */
export class MongodbTeamUserRepository implements TeamUserRepositoryInterface {
  /**
   * Creates an instance of MongodbTeamUserRepository.
   * @param teamUserCollection The injected Mongoose Model representing the team collection.
   */
  constructor(
    @InjectModel(TeamUserModel.name)
    private readonly teamUserCollection: Model<TeamUserModel>
  ) {}

  /**
   * Creates a new team user document in the database.mongo
   * @param data The team data to be saved.
   * @returns A Promise that resolves to the created team document.
   */
  async create(data: TeamUser): Promise<TeamUserModel> {
    const result = await this.teamUserCollection.create(data.toJSON());
    return result;
  }
}
