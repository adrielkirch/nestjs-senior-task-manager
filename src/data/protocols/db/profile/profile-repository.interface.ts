
import { Profile } from 'src/domain/profile/profile';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';

/**
 * Interface defining the contract for interacting with profile data storage.
 * Implementations of this interface are responsible for CRUD operations on profile data.
 */
export interface ProfileRepositoryInterface {
  /**
   * Creates a new profile in the data storage.
   * @param data The profile data to be stored.
   * @returns A Promise that resolves to the created ProfileModel.
   */
  create: (data: Profile) => Promise<ProfileModel>;

  /**
   * Updates a new profile in the data storage.
   * @param data The profile data to be updated.
   * @returns A Promise that resolves to the created ProfileModel.
   */
  update: (data: Profile) => Promise<ProfileModel>;

  /**
   * Retrieves paginated profiles from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of profiles per page.
   * @returns A Promise that resolves to an array of ProfileModel representing profiles for the specified page.
   */
  findPaginated: (page: number, limit: number) => Promise<ProfileModel[]>;

  /**
  * Retrieves profiles from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of ProfileModel representing matching profiles.
  */
  findByPropertyAndValue: <T>(property: string, value: T) => Promise<ProfileModel[]>;

  /**
   * Retrieves a profile by its unique identifier from the data storage.
   * @param id The unique identifier of the profile to retrieve.
   * @returns A Promise that resolves to the ProfileModel representing the found profile.
   */
  findById: (id: string) => Promise<ProfileModel>;

  /**
   * Delete a profile from the data storage by its unique identifier.
   * @param id The unique identifier of the profile to deletes.
   * @returns A Promise that resolves when the profile is successfully delete.
   */
  delete: (id: string) => Promise<void>;
}
