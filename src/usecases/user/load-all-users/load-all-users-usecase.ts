import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserTransformer } from 'src/main/transformers/user/user.transformer';

export class LoadAllUsersUseCase {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async load() {
    const users = await this.userRepo.find();
    return UserTransformer.toUsers(users);
  }
}
