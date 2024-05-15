import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';

/**
 * Utility class for transforming MongoDB profile models to a simpler format.
 * This class provides static methods for converting ProfileModel objects to a more concise profile representation.
 */
export class ProfileTransformer {
  /**
   * Transforms a single ProfileModel object to a simplified profile representation.
   * @param profile The ProfileModel object to be transformed.
   * @returns An object containing only essential profile properties.
   */
  static toProfile(profile: ProfileModel): ProfileResponseDto {
    return {
      id: profile.id,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      biography: profile.biography,
      image: profile.image,
      gender: profile.gender,
      userId: profile.userId,
      notifications: profile.notifications,
    } as ProfileResponseDto;
  }

  /**
   * Transforms an array of ProfileModel objects to an array of simplified profile representations.
   * @param profiles An array of ProfileModel objects to be transformed.
   * @returns An array of objects containing essential profile properties for each profile.
   */
  static toProfiles(profiles: ProfileModel[]) {
    // Map each ProfileModel object to a simplified profile representation using the `toProfile` method.
    return profiles.map(this.toProfile);
  }
}
