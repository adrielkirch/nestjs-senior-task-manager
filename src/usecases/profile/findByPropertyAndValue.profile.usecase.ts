import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { ProfileTransformer } from 'src/main/transformers/profile/profile.transformer';
export class FindByPropertyAndValueProfileUseCase {

  constructor(private readonly profileRepo: ProfileRepositoryInterface) { }

 /**
 * Loads a profile by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded profile, or null if not found.
 */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<ProfileResponseDto []> {
    const profiles = await this.profileRepo.findByPropertyAndValue(property, value);
    if (!profiles || profiles.length === 0) return null;
    return ProfileTransformer.toProfiles(profiles);
  }
}
