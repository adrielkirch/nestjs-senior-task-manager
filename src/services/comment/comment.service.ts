import {  Injectable, NotFoundException } from '@nestjs/common';
import { AddCommentUseCase } from 'src/usecases/comment/add.comment.usecase';
import { FindByIdCommentUseCase } from 'src/usecases/comment/findByIdComment.usecase';
import { FindByPropertyAndValueCommentUseCase } from 'src/usecases/comment/findByPropertyAndValue.comment.usecase';
import { FindPaginatedCommentUseCase } from 'src/usecases/comment/findPaginated.comment.usecase';
import { CreateRequestCommentDto, UpdateRequestCommentDto } from 'src/adapters/request/comment.request.dto';
import { UpdateCommentUseCase } from 'src/usecases/comment/update.comment.usecase';
import { DeleteCommentByIdUseCase } from 'src/usecases/comment/delete.comment.usecase';
import { CommentResponseDto } from 'src/adapters/response/comment.response.dto';
import { Comment } from 'src/domain/comment/comment';
import { Variables } from 'src/adapters/shared/request/variable.request.dto';

@Injectable()
export class CommentService {

    constructor(
        private readonly addCommentUseCase: AddCommentUseCase,
        private readonly updateCommentUseCase: UpdateCommentUseCase,
        private readonly findByIdCommentsUseCase: FindByIdCommentUseCase,
        private readonly findPaginatedCommentsUseCase: FindPaginatedCommentUseCase,
        private readonly findByPropertyAndValueCommentsUseCase: FindByPropertyAndValueCommentUseCase,
        private readonly deleteCommentByIdUseCase: DeleteCommentByIdUseCase,
    ) { }

    async create(data: CreateRequestCommentDto): Promise<CommentResponseDto> {
        const comment = Comment.create(data);
        const newComment = await this.addCommentUseCase.create(comment);
        return newComment;
    }

    async update(data: UpdateRequestCommentDto) {
        const existingComment = await this.findById(data.id);

        const commentId = existingComment.id;
        if (!existingComment) {
            throw new NotFoundException('Comment does not exist');
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null) {
                    delete data[key];
                }
            }
        }
    
        
        const comment = Comment.create(data, commentId);
        return await this.updateCommentUseCase.update(comment)
    }

    async delete(id: string) {
        const comment = await this.findByIdCommentsUseCase.findById(id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        await this.deleteCommentByIdUseCase.deleteById(id);
    }


    async findById(id: string): Promise<CommentResponseDto> {
        const comment = await this.findByIdCommentsUseCase.findById(id);
        if (!comment) {
            throw new NotFoundException('Comment not found.');
        }
        return comment;
    }

    async findPaginated<T>(page: number, limit: number, filter: Variables<T>): Promise<CommentResponseDto[]> {
        return await this.findPaginatedCommentsUseCase.findPaginated(page, limit,filter);
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<CommentResponseDto[]> {
        return await this.findByPropertyAndValueCommentsUseCase.findByPropertyAndValue(property, value);
    }


}
