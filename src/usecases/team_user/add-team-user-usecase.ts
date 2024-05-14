import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/team-user-repository.interface'; 
import { TeamUserTransformer } from 'src/main/transformers/team_user/team-user.transformer';
import { TeamUserResponseDto } from 'src/adapters/response/team-user.response.dto';
import { TeamUser } from 'src/domain/team_user/team-user';

/**
 * Use case class responsible for adding a new user to the system.
 * This class interacts with the TeamUserRepositoryInterface to persist the user data
 * and uses the TeamUserTransformer to convert the database model to a simplified user representation.
 */
export class AddTeamUserUseCase {
  /**
   * Constructs a new instance of the AddTeamUserUseCase class.
   * @param userRepo An instance of the TeamUserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: TeamUserRepositoryInterface) { }

  /**
   * Creates a new teamUser in the system.
   * @param teamUser The teamUser object containing the details of the user to be created.
   * @returns A Promise that resolves to the simplified representation of the created user.
   */
  async create(teamUser: TeamUser): Promise<TeamUserResponseDto> {
    const teamUserDb = await this.userRepo.create(teamUser);
    return TeamUserTransformer.toTeamUser(teamUserDb);
  }
}
