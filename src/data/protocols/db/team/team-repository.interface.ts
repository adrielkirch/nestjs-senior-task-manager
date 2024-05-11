
import { Team } from 'src/domain/team/team';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';

/**
 * Interface defining the contract for interacting with team data storage.
 * Implementations of this interface are responsible for CRUD operations on team data.
 */
export interface TeamRepositoryInterface {
  /**
   * Creates a new team in the data storage.
   * @param data The team data to be stored.
   * @returns A Promise that resolves to the created TeamModel.
   */
  create: (data: Team) => Promise<TeamModel>;

  /**
  * Retrieves teams from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of TeamModel representing matching teams.
  */
  findByPropertyAndValue: <T>(property: string, value: T) => Promise<TeamModel[]>;
}
