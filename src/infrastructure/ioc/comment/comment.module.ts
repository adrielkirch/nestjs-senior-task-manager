import { Module } from '@nestjs/common';
import { CommentController } from 'src/controllers/comment/comment.controller';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbCommentRepository } from 'src/infrastructure/database/mongodb/repositories/comment/mongodb-comment-repository';
import { CommentService } from 'src/services/comment/comment.service';
import { AddCommentUseCase } from 'src/usecases/comment/add-comment-usecase';
import { FindByIdCommentsUseCase } from 'src/usecases/comment/find-by-id-comment-usecase';
import { FindByPropertyAndValueCommentsUseCase } from 'src/usecases/comment/find-by-property-and-value-comment-usecase';

import { FindPaginatedCommentsUseCase } from 'src/usecases/comment/find-paginated-comment-usecase';
import { UpdateCommentUseCase } from 'src/usecases/comment/update-comment-usecase';
import { DeleteCommentByIdUseCase } from 'src/usecases/comment/delete-comment-usecase';

/**
 * The CommentModule is responsible for managing / inject comment-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the CommentController to handle comment-related HTTP requests.
 * It  
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: CommentService,
      useFactory: (commentRepo: CommentRepositoryInterface) => {
        return new CommentService(
          new AddCommentUseCase(commentRepo),
          new UpdateCommentUseCase(commentRepo),
          new FindByIdCommentsUseCase(commentRepo),
          new FindPaginatedCommentsUseCase(commentRepo),
          new FindByPropertyAndValueCommentsUseCase(commentRepo),
          new DeleteCommentByIdUseCase(commentRepo),
        );
      },
      inject: [MongodbCommentRepository],
    },

  ],
  controllers: [CommentController],
})
export class CommentModule { }
