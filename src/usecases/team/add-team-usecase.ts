import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team-repository.interface';
import { TeamTransformer } from 'src/main/transformers/team/team.transformer';
import { TeamResponseDto } from 'src/adapters/response/team.response.dto';
import { Team } from 'src/domain/team/team';

/**
 * Use case class responsible for adding a new team to the system.
 * This class interacts with the TeamRepositoryInterface to persist the team data
 * and uses the TeamTransformer to convert the database model to a simplified team representation.
 */
export class AddTeamUseCase {
  /**
   * Constructs a new instance of the AddTeamUseCase class.
   * @param teamRepo An instance of the TeamRepositoryInterface to interact with the team data storage.
   */
  constructor(private readonly teamRepo: TeamRepositoryInterface) { }

  /**
   * Creates a new team in the system.
   * @param team The team object containing the details of the team to be created.
   * @returns A Promise that resolves to the simplified representation of the created team.
   */
  async create(team: Team): Promise<TeamResponseDto> {
    const teamDb = await this.teamRepo.create(team);
    return TeamTransformer.toTeam(teamDb);
  }
}
