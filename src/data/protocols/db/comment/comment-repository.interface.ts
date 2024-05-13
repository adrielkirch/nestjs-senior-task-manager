

import { Comment } from 'src/domain/comment/comment';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';

/**
 * Interface defining the contract for interacting with comment data storage.
 * Implementations of this interface are responsible for CRUD operations on comment data.
 */
export interface CommentRepositoryInterface {
  /**
   * Creates a new comment in the data storage.
   * @param data The comment data to be stored.
   * @returns A Promise that resolves to the created CommentModel.
   */
  create: (data: Comment) => Promise<CommentModel>;

  /**
   * Updates a new comment in the data storage.
   * @param data The comment data to be updated.
   * @returns A Promise that resolves to the created CommentModel.
   */
  update: (data: Comment) => Promise<CommentModel>;

  /**
   * Deletes a comment by its unique identifier from the data storage.
   * @param id The unique identifier of the comment to retrieve.
   * @returns A Promise that resolves to the CommentModel representing the deleted comment.
   */
  delete: (id: string) => Promise<void>;


  /**
   * Retrieves paginated comments from the data storage.
   * @param page The page number for pagination.
   * @param limit The limit of comments per page.
   * @returns A Promise that resolves to an array of CommentModel representing comments for the specified page.
   */
  findPaginated: (page: number, limit: number) => Promise<CommentModel[]>;

  /**
  * Retrieves comments from the data storage that match a specific property and value.
  * @param property The property to search by.
  * @param value The value to search for.
  * @returns A Promise that resolves to an array of CommentModel representing matching comments.
  */
  findByPropertyAndValue: <T>(property: string, value: T) => Promise<CommentModel[]>;

  /**
   * Retrieves a comment by its unique identifier from the data storage.
   * @param id The unique identifier of the comment to retrieve.
   * @returns A Promise that resolves to the CommentModel representing the found comment.
   */
  findById: (id: string) => Promise<CommentModel>;

  /**
   * Retrieves all comments from the data storage.
   * @returns A Promise that resolves to an array of CommentModel representing all comments.
   */
  find: () => Promise<CommentModel[]>;

}
