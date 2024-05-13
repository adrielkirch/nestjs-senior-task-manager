import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { CommentTransformer } from 'src/main/transformers/comment/comment.transformer';

/**
 * Use case class responsible for loading paginated comments from the system.
 * This class interacts with the CommentRepositoryInterface to retrieve comment data
 * and uses the CommentTransformer to convert the database models to simplified comment representations.
 */
export class FindPaginatedCommentsUseCase {
  /**
   * Constructs a new instance of the FindPaginatedCommentsUseCase class.
   * @param commentRepo An instance of the CommentRepositoryInterface to interact with the comment data storage.
   */
  constructor(private readonly commentRepo: CommentRepositoryInterface) { }

  /**
   * Loads paginated comments from the system.
   * @returns A Promise that resolves to an array of simplified comment representations.
   */
  async findPaginated(page: number, limit: number): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepo.findPaginated(page, limit);
    return CommentTransformer.toComments(comments);
  }
}
