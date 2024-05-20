import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/teamUser.repository.interface';
import { TeamUserTransformer } from 'src/main/transformers/team_user/teamUser.transformer';
import { TeamUserResponseDto } from 'src/adapters/response/teamUser.response.dto';
import { TeamUser } from 'src/domain/team_user/teamUser';

/**
 * Use case class responsible for adding a new user to the system.
 * This class interacts with the TeamUserRepositoryInterface to persist the user data
 * and uses the TeamUserTransformer to convert the database model to a simplified user representation.
 */
export class DissociateTeamUserUseCase {
  /**
   * Constructs a new instance of the DissociateTeamUserUseCase class.
   * @param userRepo An instance of the TeamUserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: TeamUserRepositoryInterface) { }

  /**
   * Dissociate (delete) teamUser in the system.
   * @param teamUser The teamUser object containing the details of the teamUser 
   * @returns A Promise that resolves to the simplified representation of the created user.
   */
  async dissociate(teamUser: TeamUser): Promise<TeamUserResponseDto> {
    const teamUserDb = await this.userRepo.dissociate(teamUser);
    return TeamUserTransformer.toTeamUser(teamUserDb);
  }
}
