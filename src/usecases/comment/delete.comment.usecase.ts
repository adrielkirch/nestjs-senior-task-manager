import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment.repository.interface';

/**
 * Use case class responsible for deleting a comment by its ID from the system.
 * This class interacts with the CommentRepositoryInterface to delete comment data.
 */
export class DeleteCommentByIdUseCase {
  /**
   * Constructs a new instance of the DeleteCommentByIdUseCase class.
   * @param commentRepo An instance of the CommentRepositoryInterface to interact with the comment data storage.
   */
  constructor(private readonly commentRepo: CommentRepositoryInterface) { }

  /**
   * Deletes a comment by its ID from the system.
   * @param id The ID of the comment to delete.
   * @returns A Promise that resolves to a boolean indicating whether the comment was successfully deleted.
   */
  async deleteById(id: string): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
