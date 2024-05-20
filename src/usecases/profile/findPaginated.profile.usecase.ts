import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { ProfileTransformer } from 'src/main/transformers/profile/profile.transformer';

/**
 * Use case class responsible for loading paginated profiles from the system.
 * This class interacts with the ProfileRepositoryInterface to retrieve profile data
 * and uses the ProfileTransformer to convert the database models to simplified profile representations.
 */
export class FindPaginatedProfilesUseCase {
  /**
   * Constructs a new instance of the FindPaginatedProfilesUseCase class.
   * @param profileRepo An instance of the ProfileRepositoryInterface to interact with the profile data storage.
   */
  constructor(private readonly profileRepo: ProfileRepositoryInterface) { }

  /**
   * Loads paginated profiles from the system.
   * @returns A Promise that resolves to an array of simplified profile representations.
   */
  async findPaginated(page: number, limit: number): Promise<ProfileResponseDto[]> {
    const profiles = await this.profileRepo.findPaginated(page, limit);
    return ProfileTransformer.toProfiles(profiles);
  }
}