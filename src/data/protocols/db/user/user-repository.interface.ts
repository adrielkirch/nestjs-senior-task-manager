
import { User } from 'src/domain/user/user';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';

/**
 * Interface defining the contract for interacting with user data storage.
 * Implementations of this interface are responsible for CRUD operations on user data.
 */
export interface UserRepositoryInterface {
  /**
   * Creates a new user in the data storage.
   * @param data The user data to be stored.
   * @returns A Promise that resolves to the created UserModel.
   */
  create: (data: User) => Promise<UserModel>;

  /**
   * Updates a new user in the data storage.
   * @param data The user data to be updated.
   * @returns A Promise that resolves to the created UserModel.
   */
  update: (data: User) => Promise<UserModel>;

  /**
   * Login an user
   * @param data The login Request to be loggin.
   * @returns A Promise that resolves to the created UserModel.
   */
  login: (data: User) => Promise<UserModel>;

  /**
   * Retrieves all users from the data storage.
   * @returns A Promise that resolves to an array of UserModel representing all users.
   */
  find: () => Promise<UserModel[]>;

  /**
   * Retrieves paginated users from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of users per page.
   * @returns A Promise that resolves to an array of UserModel representing users for the specified page.
   */
  findPaginated: (page: number, limit: number) => Promise<UserModel[]>;

  /**
  * Retrieves users from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of UserModel representing matching users.
  */
  findByPropertyAndValue: <T>(property: string, value: T) => Promise<UserModel[]>;

  /**
   * Retrieves a user by its unique identifier from the data storage.
   * @param id The unique identifier of the user to retrieve.
   * @returns A Promise that resolves to the UserModel representing the found user.
   */
  findById: (id: string) => Promise<UserModel>;

  /**
   * Removes a user from the data storage by its unique identifier.
   * @param id The unique identifier of the user to remove.
   * @returns A Promise that resolves when the user is successfully removed.
   */
  remove: (id: string) => Promise<void>;
}
