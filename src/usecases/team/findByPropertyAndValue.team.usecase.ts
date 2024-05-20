import { TeamResponseDto } from 'src/adapters/response/team.response.dto';
import { TeamRepositoryInterface } from 'src/data/protocols/db/team/team.repository.interface';
import { TeamTransformer } from 'src/main/transformers/team/team.transformer';
export class FindByPropertyAndValueTeamsUseCase {

  constructor(private readonly teamRepo: TeamRepositoryInterface) { }

 /**
 * Loads a team by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded team, or null if not found.
 */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<TeamResponseDto []> {
    const teams = await this.teamRepo.findByPropertyAndValue(property, value);
    if (!teams || teams.length === 0) return null;
    return TeamTransformer.toTeams(teams);
  }
}
