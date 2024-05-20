import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user.repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';

/**
 * Use case class responsible for loading a user by their ID from the system.
 * This class interacts with the UserRepositoryInterface to retrieve user data
 * and uses the UserTransformer to convert the database model to a simplified user representation.
 */
export class FindByIdUserUseCase {
  /**
   * Constructs a new instance of the FindByIdUsersUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) { }

  /**
   * Loads a user by their ID from the system.
   * @param id The ID of the user to load.
   * @returns A Promise that resolves to the simplified representation of the loaded user.
   */
  async findById(id: string): Promise<UserResponseDto> {
    // Retrieve the user from the user data storage using the UserRepositoryInterface.
    const user = await this.userRepo.findById(id);
    // If user is not found, return null
    if (!user) return null;
    // Transform the database model to a simplified user representation using the UserTransformer.
    return UserTransformer.toUser(user);
  }
}
