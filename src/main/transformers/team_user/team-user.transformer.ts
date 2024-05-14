import { TeamUserResponseDto } from 'src/adapters/response/team-user.response.dto';
import { TeamModel } from 'src/infrastructure/database/mongodb/models/team/team.model';
import { TeamUserModel } from 'src/infrastructure/database/mongodb/models/team_user/team-user.model';


/**
 * Utility class for transforming MongoDB team user models to a simpler format.
 * This class provides static methods for converting TeamModel objects to a more concise team representation.
 */
export class TeamUserTransformer {
  /**
   * Transforms a single TeamModel object to a simplified team representation.
   * @param teamModel The TeamModel object to be transformed.
   * @returns An object containing only essential team properties.
   */
  static toTeamUser(teamModel: TeamUserModel): TeamUserResponseDto {
    return {
      id: teamModel._id,
      userId: teamModel.userId,
      createdAt: teamModel.createdAt,
      updatedAt: teamModel.updatedAt,
    } as TeamUserResponseDto;
  }

  /**
   * Transforms an array of TeamModel objects to an array of simplified team representations.
   * @param teamModels An array of TeamModel objects to be transformed.
   * @returns An array of objects containing essential team properties for each team.
   */
  static toTeams(teamModels: TeamUserModel[]): TeamUserResponseDto[] {
    return teamModels.map(this.toTeamUser);
  }
}
