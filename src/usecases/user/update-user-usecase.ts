import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { User } from 'src/domain/user/user';
import { UserTransformer } from '../../main/transformers/user/user.transformer';
import { UserResponseDto } from 'src/adapters/response/user.response.dto';

/**
 * Use case class responsible for updating a new user to the system.
 * This class interacts with the UserRepositoryInterface to persist the user data
 * and uses the UserTransformer to convert the database model to a simplified user representation.
 */
export class UpdateUserUseCase {
  /**
   * Constructs a new instance of the UpdateUserUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) { }

  /**
   * Updates a new user in the system.
   * @param user The user object containing the details of the user to be updated.
   * @returns A Promise that resolves to the simplified representation of the updated user.
   */
  async update(user: User): Promise<UserResponseDto> {
    const userDb = await this.userRepo.update(user);
    return UserTransformer.toUser(userDb);
  }
}
