import { TeamUserResponseDto } from 'src/adapters/response/team-user.response.dto';
import { TeamUserRepositoryInterface } from 'src/data/protocols/db/team_user/team-user-repository.interface';
import { TeamUserTransformer } from 'src/main/transformers/team_user/team-user.transformer';
export class FindByPropertyAndValueUsersUseCase {

  constructor(private readonly teamUserRepo: TeamUserRepositoryInterface) { }

 /**
 * Loads a teamUser by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded teamUser, or null if not found.
 */
  async findByUserIdAndTeamIdValue<T>(property: string, value: T): Promise<TeamUserResponseDto []> {
    const teamUsers = await this.teamUserRepo.findByPropertyAndValue(property, value);
    if (!teamUsers || teamUsers.length === 0) return null;
    return TeamUserTransformer.toTeams(teamUsers);
  }
}
