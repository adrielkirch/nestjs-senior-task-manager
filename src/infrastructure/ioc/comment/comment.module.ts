import { Module } from '@nestjs/common';
import { CommentController } from 'src/controllers/comment/comment.controller';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment.repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbCommentRepository } from 'src/infrastructure/database/mongodb/repositories/comment/mongodb.comment.repository';
import { CommentService } from 'src/services/comment/comment.service';
import { AddCommentUseCase } from 'src/usecases/comment/add.comment.usecase';
import { FindByIdCommentUseCase } from 'src/usecases/comment/findByIdComment.usecase';
import { FindByPropertyAndValueCommentUseCase } from 'src/usecases/comment/findByPropertyAndValue.comment.usecase';
import { FindPaginatedCommentUseCase } from 'src/usecases/comment/findPaginated.comment.usecase';
import { UpdateCommentUseCase } from 'src/usecases/comment/update.comment.usecase';
import { DeleteCommentByIdUseCase } from 'src/usecases/comment/delete.comment.usecase';

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
          new FindByIdCommentUseCase(commentRepo),
          new FindPaginatedCommentUseCase(commentRepo),
          new FindByPropertyAndValueCommentUseCase(commentRepo),
          new DeleteCommentByIdUseCase(commentRepo),
        );
      },
      inject: [MongodbCommentRepository],
    },

  ],
  controllers: [CommentController],
})
export class CommentModule { }
