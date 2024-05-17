import { Variables } from 'src/adapters/shared/request/variable.request.dto';
import { CommentRepositoryInterface } from 'src/data/protocols/db/comment/comment-repository.interface';
import { Comment } from 'src/domain/comment/comment';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';


class MockCommentRepository implements CommentRepositoryInterface {
  create(data: Comment): Promise<CommentModel> {
    return Promise.resolve({} as CommentModel);
  }

  update(data: Comment): Promise<CommentModel> {
    return Promise.resolve({} as CommentModel);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }

  findPaginated<T>(page: number, limit: number, filter: Variables<T>): Promise<CommentModel[]> {
    return Promise.resolve([]);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<CommentModel[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<CommentModel> {

    return Promise.resolve({} as CommentModel);
  }

  find(): Promise<CommentModel[]> {

    return Promise.resolve([]);
  }
}
describe('CommentRepositoryInterface', () => {
  let repository: CommentRepositoryInterface;

  beforeEach(() => {
    repository = new MockCommentRepository();
  });

  it('should create a new comment', async () => {
    const props = {
      taskId: "321",
      userId: "123",
      text: "test"
    };

    const comment = Comment.create(props);
    const result = await repository.create(comment);
    expect(result).toBeDefined();
  });

  it('should update an existing comment', async () => {
    const props = {
      id: "123",
      taskId: "321",
      userId: "123",
      text: "test"
    };
    const comment = Comment.create(props);
    const result = await repository.update(comment);
    expect(result).toBeDefined();
  });

  it('should delete a comment by its id', async () => {
    const commentId = "123";
    await expect(repository.delete(commentId)).resolves.not.toThrow();
  });

  it('should find comments paginated', async () => {
    const page = 1;
    const limit = 10;
    const filter = {} as Variables<any>;
    const result = await repository.findPaginated(page, limit, filter);
    expect(result).toHaveLength(0);
  });

  it('should find comments by property and value', async () => {
    const property = "taskId";
    const value = "321";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });

  it('should find a comment by its id', async () => {
    const commentId = "123";
    const result = await repository.findById(commentId);
    expect(result).toBeDefined();
  });

  it('should find all comments', async () => {
    const result = await repository.find();
    expect(result).toHaveLength(0);
  });
});
