import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';

/**
 * Use case class responsible for loading all users from the system.
 * This class interacts with the UserRepositoryInterface to retrieve user data
 * and uses the UserTransformer to convert the database models to simplified user representations.
 */
export class LoadAllUsersUseCase {
  /**
   * Constructs a new instance of the LoadAllUsersUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  /**
   * Loads all users from the system.
   * @returns A Promise that resolves to an array of simplified user representations.
   */
  async load() {
    // Retrieve all users from the user data storage using the UserRepositoryInterface.
    const users = await this.userRepo.find();
    // Transform the database models to simplified user representations using the UserTransformer.
    return UserTransformer.toUsers(users);
  }
}
