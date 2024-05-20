import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/teamUser.repository.interface';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/teamUser.model';
import { TeamUser } from 'src/domain/team_user/teamUser';

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
  ) { }

  /**
   * Creates a new team user document in the database.mongo
   * @param data The team data to be saved.
   * @returns A Promise that resolves to the created team document.
   */
  async create(data: TeamUser): Promise<TeamUserModel> {
    return await this.teamUserCollection.create(data.toJSON());
  }

  /**
   * Retrieves all users from the data storage that match a specific property and value.
   * @param property The property to search for.
   * @param value The value to search for in the specified property.
   * @returns A Promise that resolves to an array of user documents matching the criteria.
   */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<TeamUserModel[]> {
    return await this.teamUserCollection.find({ [property]: value });
  }

  /**
 * Retrieves all users from the data storage that match a specific property and value.
 * @param property The property to search for.
 * @param value The value to search for in the specified property.
 * @returns A Promise that resolves to an array of user documents matching the criteria.
 */
  async findByUserAndTeam(userId: string, teamId: string): Promise<TeamUserModel[]> {
    console.log(`TeamId: ${teamId}\n, UserId: ${userId}`);
    const result = await this.teamUserCollection.find({
      'teamId': teamId,
      'userId': userId
    });
    return result;
  }

  /**
   * Delete a team user document in the database.mongo
   * @param data The team data to be saved.
   * @returns A Promise that resolves to the created team document.
   */
  async dissociate(data: TeamUser): Promise<TeamUserModel> {
    return await this.teamUserCollection.findOneAndDelete({ 'userId': data.userId, 'teamId': data.teamId });
  }
}
