import { TeamResponseDto } from 'src/adapters/response/team.response.dto';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';
/**
 * Utility class for transforming MongoDB team models to a simpler format.
 * This class provides static methods for converting TeamModel objects to a more concise team representation.
 */
export class TeamTransformer {
  /**
   * Transforms a single TeamModel object to a simplified team representation.
   * @param team The TeamModel object to be transformed.
   * @returns An object containing only essential team properties.
   */
  static toTeam(team: TeamModel): TeamResponseDto {
    return {
      id: team._id,
      name: team.name,
      userId: team.userId,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    } as TeamResponseDto;
  }

  /**
   * Transforms an array of TeamModel objects to an array of simplified team representations.
   * @param teams An array of TeamModel objects to be transformed.
   * @returns An array of objects containing essential team properties for each team.
   */
  static toTeams(teams: TeamModel[]): TeamResponseDto[] {
    // Map each TeamModel object to a simplified team representation using the `toTeam` method.
    return teams.map(this.toTeam);
  }
}
