import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { CommentTransformer } from 'src/main/transformers/comment/comment.transformer';
import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { Comment } from 'src/domain/comment/comment';

/**
 * Use case class responsible for updating a new comment to the system.
 * This class interacts with the CommentRepositoryInterface to persist the comment data
 * and uses the CommentTransformer to convert the database model to a simplified comment representation.
 */
export class UpdateCommentUseCase {
  /**
   * Constructs a new instance of the UpdateCommentUseCase class.
   * @param commentRepo An instance of the CommentRepositoryInterface to interact with the comment data storage.
   */
  constructor(private readonly commentRepo: CommentRepositoryInterface) { }

  /**
   * Updates a new comment in the system.
   * @param comment The comment object containing the details of the comment to be updated.
   * @returns A Promise that resolves to the simplified representation of the updated comment.
   */
  async update(comment: Comment): Promise<CommentResponseDto> {
    const commentDb = await this.commentRepo.update(comment);
    return CommentTransformer.toComment(commentDb);
  }
}
