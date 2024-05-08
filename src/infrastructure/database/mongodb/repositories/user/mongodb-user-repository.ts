import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/user/user';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { UserModel } from '../../models/user/user.model';
import { LoginRequestDto } from 'src/adapters/request/user.request.dto';

/**
 * Repository implementation for MongoDB database.
 */
export class MongodbUserRepository implements UserRepositoryInterface {
  /**
   * Creates an instance of MongodbUserRepository.
   * @param userCollection The injected Mongoose Model representing the user collection.
   */
  constructor(
    @InjectModel(UserModel.name)
    private readonly userCollection: Model<UserModel>,
  ) { }

  /**
   * Authenticates a user based on the provided login credentials.
   * @param loginRequestDto The login request data containing email and password.
   * @returns A Promise that resolves to the authenticated user document, or null if authentication fails.
   */
  async login(loginRequestDto: LoginRequestDto): Promise<UserModel | null> {
    return await this.userCollection.findOne({
      email: loginRequestDto.email,
      password: loginRequestDto.password,
    });
  }

  /**
   * Creates a new user document in the database.
   * @param data The user data to be saved.
   * @returns A Promise that resolves to the created user document.
   */
  async create(data: User): Promise<UserModel> {
    const result = await this.userCollection.create(data);
    return result;
  }

  /**
   * Finds all user documents in the database.
   * @returns A Promise that resolves to an array of user documents.
   */
  async find(): Promise<UserModel[]> {
    return await this.userCollection.find({}, { __v: false });
  }

  /**
   * Finds a user document by its ID in the database.
   * @param id The ID of the user document to find.
   * @returns A Promise that resolves to the found user document, or null if not found.
   */
  async findById(id: string): Promise<UserModel> {
    return await this.userCollection.findOne({ _id: { $eq: id } });
  }


  /**
   * Retrieves all users from the data storage that match a specific property and value.
   * @param property The property to search for.
   * @param value The value to search for in the specified property.
   * @returns A Promise that resolves to an array of user documents matching the criteria.
   */
  async findByPropertyAndValue(property: string, value: any): Promise<UserModel[]> {
    return await this.userCollection.find({ [property]: value });
  }

  /**
   * Updates a user document in the database.
   * @param id The ID of the user document to update.
   * @param dataUpdate The updated user data.
   * @returns A Promise that resolves to the updated user document.
   */
  async update(dataUpdate: User): Promise<UserModel> {
    return await this.userCollection.findOneAndUpdate(
      { _id: { $eq: dataUpdate.id } },
      { $set: dataUpdate },
      { new: true },
    );
  }

  /**
   * Retrieves paginated users from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of users per page.
   * @returns A Promise that resolves to an array of UserModel representing users for the specified page.
   */
  async findPaginated(page: number, limit: number): Promise<UserModel[]> {
    const skip = (page - 1) * limit;
    return await this.userCollection.find({}, { __v: false }).skip(skip).limit(limit);
  }

  /**
   * Removes a user document from the database.
   * @param id The ID of the user document to remove.
   * @returns A Promise that resolves when the user document is successfully removed.
   */
  async remove(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
