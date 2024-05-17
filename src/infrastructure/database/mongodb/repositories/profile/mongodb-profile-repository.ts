import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/domain/profile/profile';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';


/**
 * Repository implementation for MongoDB database.
 */
export class MongodbProfileRepository implements ProfileRepositoryInterface {
  /**
   * Creates an instance of MongodbProfileRepository.
   * @param profileCollection The injected Mongoose Model representing the profile collection.
   */
  constructor(
    @InjectModel(ProfileModel.name)
    private readonly profileCollection: Model<ProfileModel>,
  ) { }


  /**
   * Creates a new profile document in the database.
   * @param data The profile data to be saved.
   * @returns A Promise that resolves to the created profile document.
   */
  async create(data: Profile): Promise<ProfileModel> {
    const result = await this.profileCollection.create(data.toJSON());
    return result;
  }

  /**
   * Finds all profile documents in the database.
   * @returns A Promise that resolves to an array of profile documents.
   */
  async find(): Promise<ProfileModel[]> {
    return await this.profileCollection.find({}, { __v: false });
  }

  /**
   * Finds a profile document by its ID in the database.
   * @param id The ID of the profile document to find.
   * @returns A Promise that resolves to the found profile document, or null if not found.
   */
  async findById(id: string): Promise<ProfileModel> {
    return await this.profileCollection.findOne({ _id: { $eq: id } });
  }


  /**
   * Retrieves all profiles from the data storage that match a specific property and value.
   * @param property The property to search for.
   * @param value The value to search for in the specified property.
   * @returns A Promise that resolves to an array of profile documents matching the criteria.
   */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<ProfileModel[]> {
    return await this.profileCollection.find({ [property]: value });
  }

  /**
   * Updates a profile document in the database.
   * @param id The ID of the profile document to update.
   * @param dataUpdate The updated profile data.
   * @returns A Promise that resolves to the updated profile document.
   */
  async update(dataUpdate: Profile): Promise<ProfileModel> {
    return await this.profileCollection.findOneAndUpdate(
      { _id: { $eq: dataUpdate.id } },
      { $set: dataUpdate.toJSON() },
      { new: true },
    );
  }

  /**
   * Retrieves paginated profiles from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of profiles per page.
   * @returns A Promise that resolves to an array of ProfileModel representing profiles for the specified page.
   */
  async findPaginated(page: number, limit: number): Promise<ProfileModel[]> {
    const skip = (page - 1) * limit;
    return await this.profileCollection.find({}, { __v: false }).skip(skip).limit(limit);
  }

  /**
   * Removes a profile document from the database.
   * @param id The ID of the profile document to remove.
   * @returns A Promise that resolves when the profile document is successfully removed.
   */
  async delete(id: string): Promise<void> {
    await this.profileCollection.deleteOne({ _id: { $eq: id } });
  }
}
