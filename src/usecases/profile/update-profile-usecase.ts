import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { Profile } from 'src/domain/profile/profile';
import { ProfileTransformer } from 'src/main/transformers/profile/profile.transformer';
import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';

/**
 * Use case class responsible for updating a new profile to the system.
 * This class interacts with the ProfileRepositoryInterface to persist the profile data
 * and uses the ProfileTransformer to convert the database model to a simplified profile representation.
 */
export class UpdateProfileUseCase {
  /**
   * Constructs a new instance of the UpdateProfileUseCase class.
   * @param profileRepo An instance of the ProfileRepositoryInterface to interact with the profile data storage.
   */
  constructor(private readonly profileRepo: ProfileRepositoryInterface) { }

  /**
   * Updates a new profile in the system.
   * @param profile The profile object containing the details of the profile to be updated.
   * @returns A Promise that resolves to the simplified representation of the updated profile.
   */
  async update(profile: Profile): Promise<ProfileResponseDto> {
    const profileDb = await this.profileRepo.update(profile);
    return ProfileTransformer.toProfile(profileDb);
  }
}
