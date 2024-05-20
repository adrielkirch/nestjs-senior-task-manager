import { TeamUserResponseDto } from 'src/adapters/response/teamUser.response.dto'
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/teamUser.repository.interface';
import { TeamUserTransformer } from 'src/main/transformers/team_user/teamUser.transformer';


export class FindByUserAndTeamUseCases {

  constructor(private readonly teamUserRepo: TeamUserRepositoryInterface) { }

  /**
  * Loads a teamUser by their ID from the system.
  * @param userId The userId to search for.
  * @param teamId The teamId to search for.
  * @returns A Promise that resolves to the simplified representation of the loaded teamUser, or null if not found.
  */
  async findByUserAndTeam(userId: string, teamId: string): Promise<TeamUserResponseDto[]> {
    const teamUsers = await this.teamUserRepo.findByUserAndTeam(
      userId,
      teamId
    );
    if (!teamUsers || teamUsers.length === 0) return null;
    return TeamUserTransformer.toTeams(teamUsers);
  }
}
