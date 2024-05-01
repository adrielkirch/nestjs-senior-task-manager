import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserTransformer } from '../../main/transformers/user/user.transformer';
import { LoginRequestDto } from 'src/adapters/request/adapter.request.user';
import { SecurityUtil } from 'src/utils/util.security';

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
   * @param loginRequestDto The login request data containing email and password.
   * @returns A Promise that resolves to the simplified representation of the authenticated user.
   */
  async login(loginRequestDto: LoginRequestDto) {
    const userDb = await this.userRepo.login(loginRequestDto);
    if (!userDb) {
      return null;
    }
    return UserTransformer.toUser(userDb);
  }
}
