
import { TeamUser } from 'src/domain/team_user/team-user';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/team-user.model'; 

/**
 * Interface defining the contract for interacting with team data storage.
 * Implementations of this interface are responsible for CRUD operations on team data.
 */
export interface TeamUserRepositoryInterface {
  /**
   * Creates a new TeamUser in the data storage.
   * @param data The team data to be stored.
   * @returns A Promise that resolves to the created TeamModel.
   */
  create: (data: TeamUser) => Promise<TeamUserModel>;

  /**
  * Retrieves TeamUser from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of UserModel representing matching users.
  */
  findByPropertyAndValue: <T>(property: string, value: T) => Promise<TeamUserModel[]>;

  /**
  * Retrieves TeamUser from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of UserModel representing matching users.
  */
  findByUserAndTeam: (userId: string, teamId: string) => Promise<TeamUserModel[]>;


   /**
   * dissociate (delete) a new TeamUser in the data storage.
   * @param data The team data to be deleted.
   * @returns A Promise that resolves to the created TeamModel.
   */
   dissociate: (data: TeamUser) => Promise<TeamUserModel>;

}
