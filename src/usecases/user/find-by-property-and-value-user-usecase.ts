import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';
export class FindByPropertyAndValueUsersUseCase {

  constructor(private readonly userRepo: UserRepositoryInterface) { }

 /**
 * Loads a user by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded user, or null if not found.
 */
  async findByPropertyAndValue(property: string, value: any): Promise<UserResponseDto []> {
    const users = await this.userRepo.findByPropertyAndValue(property, value);
    if (!users || users.length === 0) return null;
    return UserTransformer.toUsers(users);
  }
}
