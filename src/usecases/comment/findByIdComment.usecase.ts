import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment.repository.interface';
import { CommentTransformer } from 'src/main/transformers/comment/comment.transformer';

/**
 * Use case class responsible for loading a comment by their ID from the system.
 * This class interacts with the CommentRepositoryInterface to retrieve comment data
 * and uses the CommentTransformer to convert the database model to a simplified comment representation.
 */
export class FindByIdCommentUseCase {
  /**
   * Constructs a new instance of the FindByIdCommentUseCase class.
   * @param commentRepo An instance of the CommentRepositoryInterface to interact with the comment data storage.
   */
  constructor(private readonly commentRepo: CommentRepositoryInterface) { }

  /**
   * Loads a comment by their ID from the system.
   * @param id The ID of the comment to load.
   * @returns A Promise that resolves to the simplified representation of the loaded comment.
   */
  async findById(id: string): Promise<CommentResponseDto> {
    // Retrieve the comment from the comment data storage using the CommentRepositoryInterface.
    const comment = await this.commentRepo.findById(id);
    // If comment is not found, return null
    if (!comment) return null;
    // Transform the database model to a simplified comment representation using the CommentTransformer.
    return CommentTransformer.toComment(comment);
  }
}
