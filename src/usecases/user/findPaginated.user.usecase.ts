import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user.repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';

/**
 * Use case class responsible for loading paginated users from the system.
 * This class interacts with the UserRepositoryInterface to retrieve user data
 * and uses the UserTransformer to convert the database models to simplified user representations.
 */
export class FindPaginatedUsersUseCase {
  /**
   * Constructs a new instance of the FindPaginatedUsersUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) { }

  /**
   * Loads paginated users from the system.
   * @returns A Promise that resolves to an array of simplified user representations.
   */
  async findPaginated(page: number, limit: number): Promise<UserResponseDto[]> {
    const users = await this.userRepo.findPaginated(page, limit);
    return UserTransformer.toUsers(users);
  }
}