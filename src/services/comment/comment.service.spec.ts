import { CommentService } from 'src/services/comment/comment.service';
import { AddCommentUseCase } from 'src/usecases/comment/add.comment.usecase';
import { UpdateCommentUseCase } from 'src/usecases/comment/update.comment.usecase';
import { FindByPropertyAndValueCommentUseCase } from 'src/usecases/comment/findByPropertyAndValue.comment.usecase';
import { Comment } from 'src/domain/comment/comment';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment.repository.interface';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';
import DateUtil from 'src/utils/util.date';
import { FindByIdCommentUseCase } from 'src/usecases/comment/findByIdComment.usecase';
import { FindPaginatedCommentUseCase } from 'src/usecases/comment/findPaginated.comment.usecase';
import { DeleteCommentByIdUseCase } from 'src/usecases/comment/delete.comment.usecase';

function getCommentData(commentId: string) {
    return {
        id: commentId,
        text: "Simple Comment!",
        taskId: "321",
        userId: "123",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00")
    }
}

function getCommentUpdateDataModel(commentId: string): CommentModel {
    return {
        _id: commentId,
        id: commentId,
        text: "Simple Comment!",
        taskId: "321",
        userId: "123",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00")
    } as CommentModel;
}

function getCommentUpdateData(commentId: string) {
    return {
        id: commentId,
        text: "Simple Comment!",
        taskId: "321",
        userId: "123",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00")
    }
}


function getCommentUpdateDataDto(commentId: string) {
    return {
        id: commentId,
        text: "Simple Comment!",
        taskId: "321",
        userId: "123",
    }
}

function getCommentDataDto(commentId: string) {
    return {
        id: commentId,
        text: "Simple Comment!",
        taskId: "321",
        userId: "123",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    }
}

export class MockCommentRepository implements CommentRepositoryInterface {

    async create(data: Comment): Promise<CommentModel> {
        const result: CommentModel = {
            _id: "123",
            ...getCommentData('123')
        } as CommentModel;
        return result;
    }


    async find(): Promise<CommentModel[]> {
        const result: CommentModel = {
            _id: "123",
            ...getCommentData('123')
        } as CommentModel;
        return [result]
    }


    async findById(id: string): Promise<CommentModel> {
        const result: CommentModel = {
            _id: "123",
            ...getCommentData('123')
        } as CommentModel;
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<CommentModel[]> {
        return []
    }


    async update(dataUpdate: Comment): Promise<CommentModel> {
        return getCommentUpdateDataModel('123')
    }

    async findPaginated(page: number, limit: number): Promise<CommentModel[]> {
        const result: CommentModel = {
            _id: "123",
            ...getCommentData('123')
        } as CommentModel;
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}

describe('CommentService', () => {
    let commentService: CommentService;
    let addCommentUseCase: AddCommentUseCase;
    let updateCommentUseCase: UpdateCommentUseCase;
    let findByIdCommentsUseCase: FindByIdCommentUseCase;
    let findPaginatedCommentsUseCase: FindPaginatedCommentUseCase;
    let findByPropertyAndValueCommentsUseCase: FindByPropertyAndValueCommentUseCase;
    let deleteCommentByIdUseCase: DeleteCommentByIdUseCase;

    beforeEach(() => {
        addCommentUseCase = new AddCommentUseCase(new MockCommentRepository());
        updateCommentUseCase = new UpdateCommentUseCase(new MockCommentRepository());
        findByIdCommentsUseCase = new FindByIdCommentUseCase(new MockCommentRepository());
        findPaginatedCommentsUseCase = new FindPaginatedCommentUseCase(new MockCommentRepository());
        findByPropertyAndValueCommentsUseCase = new FindByPropertyAndValueCommentUseCase(new MockCommentRepository())

        commentService = new CommentService(
            addCommentUseCase,
            updateCommentUseCase,
            findByIdCommentsUseCase,
            findPaginatedCommentsUseCase,
            findByPropertyAndValueCommentsUseCase,
            deleteCommentByIdUseCase
        );
    });

    describe('create', () => {
        it('should create a new comment', async () => {
            const result = await commentService.create(getCommentDataDto('123'));
            const expected = getCommentData('123');
            expect(result).toEqual(expected);
        });
    });


    describe('update', () => {
        it('should update an comment', async () => {

            await commentService.create(getCommentDataDto('123'));
            const result = await commentService.update(getCommentUpdateDataDto('123'));
            const expected = getCommentUpdateData('123')
            expect(result).toEqual(expected);

        });
    });

    describe('findById', () => {
        it('should find an comment by id', async () => {
            await commentService.create(getCommentDataDto('123'));
            const result = await commentService.findById('123');
            const expected = getCommentData('123');
            expect(result).toEqual(expected);

        });
    });

    describe('findPaginated', () => {
        it('should find paginated comments', async () => {
            const result = await commentService.findPaginated(1, 1,null);
            const expected = [getCommentData('123')];
            expect(result).toEqual(expected);

        });
    });

    describe('findByFieldAndValue', () => {
        it('should find all comments', async () => {
            const result = await commentService.findByPropertyAndValue("name", "nonExistentComment");
            expect(result).toBeNull()
        });
    });
});
