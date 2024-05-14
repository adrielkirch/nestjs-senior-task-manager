import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';
/**
 * Utility class for transforming MongoDB comment models to a simpler format.
 * This class provides static methods for converting CommentModel objects to a more concise comment representation.
 */
export class CommentTransformer {
  /**
   * Transforms a single CommentModel object to a simplified comment representation.
   * @param comment The CommentModel object to be transformed.
   * @returns An object containing only essential comment properties.
   */
  static toComment(comment: CommentModel): CommentResponseDto {
    return {
      id: comment._id,
      text: comment.text,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId,
      taskId: comment.taskId
    } as CommentResponseDto;
  }

  /**
   * Transforms an array of CommentModel objects to an array of simplified comment representations.
   * @param comments An array of CommentModel objects to be transformed.
   * @returns An array of objects containing essential comment properties for each comment.
   */
  static toComments(comments: CommentModel[]): CommentResponseDto[] {
    // Map each CommentModel object to a simplified comment representation using the `toComment` method.
    return comments.map(comment => this.toComment(comment)); 
  }
}
