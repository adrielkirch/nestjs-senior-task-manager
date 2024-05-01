import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { User } from 'src/domain/user/user';
import { UserTransformer } from '../../main/transformers/user/user.transformer';
import { SecurityUtil } from 'src/utils/util.security';

/**
 * Use case class responsible for adding a new user to the system.
 * This class interacts with the UserRepositoryInterface to persist the user data
 * and uses the UserTransformer to convert the database model to a simplified user representation.
 */
export class AddUserUseCase {
  /**
   * Constructs a new instance of the AddUserUseCase class.
   * @param userRepo An instance of the UserRepositoryInterface to interact with the user data storage.
   */
  constructor(private readonly userRepo: UserRepositoryInterface) { }

  /**
   * Creates a new user in the system.
   * @param user The user object containing the details of the user to be created.
   * @returns A Promise that resolves to the simplified representation of the created user.
   */
  async create(user: User) {

    const hashPassword = SecurityUtil.generateHashWithSalt(user.password);
    user.password = hashPassword;

    let existingUsers = await this.userRepo.findByPropertyAndValue("email", user.email);

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('User with this email already exists');
    }

    const userDb = await this.userRepo.create(user);
    return UserTransformer.toUser(userDb);
  }
}
