import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { ProfileTransformer } from 'src/main/transformers/profile/profile.transformer';

/**
 * Use case class responsible for loading a profile by their ID from the system.
 * This class interacts with the ProfileRepositoryInterface to retrieve profile data
 * and uses the ProfileTransformer to convert the database model to a simplified profile representation.
 */
export class FindByIdProfilesUseCase {
  /**
   * Constructs a new instance of the FindByIdProfilesUseCase class.
   * @param profileRepo An instance of the ProfileRepositoryInterface to interact with the profile data storage.
   */
  constructor(private readonly profileRepo: ProfileRepositoryInterface) { }

  /**
   * Loads a profile by their ID from the system.
   * @param id The ID of the profile to load.
   * @returns A Promise that resolves to the simplified representation of the loaded profile.
   */
  async findById(id: string): Promise<ProfileResponseDto> {
    // Retrieve the profile from the profile data storage using the ProfileRepositoryInterface.
    const profile = await this.profileRepo.findById(id);
    // If profile is not found, return null
    if (!profile) return null;
    // Transform the database model to a simplified profile representation using the ProfileTransformer.
    return ProfileTransformer.toProfile(profile);
  }
}
