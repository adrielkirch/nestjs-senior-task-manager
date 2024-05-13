import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';
import { Comment } from 'src/domain/comment/comment';

/**
 * Repository implementation for MongoDB database.
 */
export class MongodbCommentRepository implements CommentRepositoryInterface {
  /**
   * Creates an instance of MongodbCommentRepository.
   * @param commentCollection The injected Mongoose Model representing the comment collection.
   */
  constructor(
    @InjectModel(CommentModel.name)
    private readonly commentCollection: Model<CommentModel>,
  ) { }


  /**
   * Creates a new comment document in the database.
   * @param data The comment data to be saved.
   * @returns A Promise that resolves to the created comment document.
   */
  async create(data: Comment): Promise<CommentModel> {
    return await this.commentCollection.create(data.toJSON());
  }

  /**
   * Finds all comment documents in the database.
   * @returns A Promise that resolves to an array of comment documents.
   */
  async find(): Promise<CommentModel[]> {
    return await this.commentCollection.find({}, { __v: false });
  }

  /**
   * Finds a comment document by its ID in the database.
   * @param id The ID of the comment document to find.
   * @returns A Promise that resolves to the found comment document, or null if not found.
   */
  async findById(id: string): Promise<CommentModel> {
    return await this.commentCollection.findOne({ _id: { $eq: id } });
  }


  /**
   * Retrieves all comments from the data storage that match a specific property and value.
   * @param property The property to search for.
   * @param value The value to search for in the specified property.
   * @returns A Promise that resolves to an array of comment documents matching the criteria.
   */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<CommentModel[]> {
    return await this.commentCollection.find({ [property]: value });
  }

  /**
   * Updates a comment document in the database.
   * @param id The ID of the comment document to update.
   * @param dataUpdate The updated comment data.
   * @returns A Promise that resolves to the updated comment document.
   */
  async update(dataUpdate: Comment): Promise<CommentModel> {
    return await this.commentCollection.findOneAndUpdate(
      { _id: { $eq: dataUpdate.id } },
      { $set: dataUpdate.toJSON() },
      { new: true },
    );
  }

  /**
   * Retrieves paginated comments from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of comments per page.
   * @returns A Promise that resolves to an array of CommentModel representing comments for the specified page.
   */
  async findPaginated(page: number, limit: number): Promise<CommentModel[]> {
    const skip = (page - 1) * limit;
    return await this.commentCollection.find({}, { __v: false }).skip(skip).limit(limit);
  }

  /**
   * Removes a comment document from the database.
   * @param id The ID of the comment document to remove.
   * @returns A Promise that resolves when the comment document is successfully removed.
   */
  async delete(id: string): Promise<void> {
    await this.commentCollection.deleteOne({ _id: { $eq: id } });
  }


}
