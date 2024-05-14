import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { CommentTransformer } from 'src/main/transformers/comment/comment.transformer';
export class FindByPropertyAndValueCommentsUseCase {

  constructor(private readonly commentRepo: CommentRepositoryInterface) { }

  /**
 * Loads a comment by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded comment, or null if not found.
 */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepo.findByPropertyAndValue(property, value);
    if (!comments || comments.length === 0) return null;
    return CommentTransformer.toComments(comments);
  }
}
