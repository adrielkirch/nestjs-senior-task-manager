import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/user/user';
import { UserRepositoryInterface } from '../../../../../data/protocols/db/user/user-repository.interface';
import { UserModel } from '../../models/user/user.model';

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
  ) {}

  /**
   * Creates a new user document in the database.
   * @param data The user data to be saved.
   * @returns A Promise that resolves to the created user document.
   */
  async create(data: User): Promise<UserModel> {
    return await this.userCollection.create(data);
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
   * Updates a user document in the database.
   * @param id The ID of the user document to update.
   * @param dataUpdate The updated user data.
   * @returns A Promise that resolves to the updated user document.
   */
  async update(id: string, dataUpdate: User): Promise<UserModel> {
    return await this.userCollection.findOneAndUpdate(
      { _id: { $eq: id } },
      { $set: dataUpdate },
      { new: true },
    );
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
