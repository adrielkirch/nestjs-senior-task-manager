
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

}
