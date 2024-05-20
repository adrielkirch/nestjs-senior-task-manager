import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/domain/team/team';
import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team.repository.interface';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';

/**
 * Repository implementation for MongoDB database.
 */
export class MongodbTeamRepository implements TeamRepositoryInterface {
  /**
   * Creates an instance of MongodbTeamRepository.
   * @param teamCollection The injected Mongoose Model representing the team collection.
   */
  constructor(
    @InjectModel(TeamModel.name)
    private readonly teamCollection: Model<TeamModel>,
  ) { }

  /**
   * Creates a new team document in the database.
   * @param data The team data to be saved.
   * @returns A Promise that resolves to the created team document.
   */
  async create(data: Team): Promise<TeamModel> {
    const result = await this.teamCollection.create(data.toJSON());
    return result;
  }

  /**
   * Retrieves all teams from the data storage that match a specific property and value.
   * @param property The property to search for.
   * @param value The value to search for in the specified property.
   * @returns A Promise that resolves to an array of team documents matching the criteria.
   */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<TeamModel[]> {
    return await this.teamCollection.find({ [property]: value });
  }

}
