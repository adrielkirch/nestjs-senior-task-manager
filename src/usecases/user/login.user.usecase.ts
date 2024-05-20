import { UserRepositoryInterface } from 'src/data/protocols/db/user/user.repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';
import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import { User } from 'src/domain/user/user';

/**
 * Use case class responsible for handling user login functionality.
 * This class interacts with the UserRepositoryInterface to validate the login credentials
 * and uses the UserTransformer to convert the database model to a simplified user representation.
 */
export class LoginUserUseCase {
  /**
   * Constructs a new instance of the LoginUserUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) { }

  /**
   * Handles the user login process.
   * @param user The User data containing email and password to login.
   * @returns A Promise that resolves to the simplified representation of the authenticated user.
   */
  async login(user: User): Promise<UserResponseDto> {
    const userDb = await this.userRepo.login(user);
    if (!userDb) {
      return null;
    }
    return UserTransformer.toUser(userDb);
  }
}
