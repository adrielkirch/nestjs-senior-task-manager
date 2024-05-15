import { Task } from 'src/domain/task/task';
import { TaskModel } from 'src/infrastructure/database/mongodb/models/task/task.model';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';

class MockTaskRepository implements TaskRepositoryInterface {
  create(data: Task): Promise<TaskModel> {
    return Promise.resolve({} as TaskModel);
  }

  update(data: Task): Promise<TaskModel> {
    return Promise.resolve({} as TaskModel);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }

  findPaginated(page: number, limit: number): Promise<TaskModel[]> {
    return Promise.resolve([]);
  }

  findByPropertyAndValue<T>(property: string, value: T): Promise<TaskModel[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<TaskModel> {
    return Promise.resolve({} as TaskModel);
  }

  find(): Promise<TaskModel[]> {
    return Promise.resolve([]);
  }
}

describe('TaskRepositoryInterface', () => {
  let repository: TaskRepositoryInterface;

  beforeEach(() => {
    repository = new MockTaskRepository();
  });

  it('should create a new task', async () => {
    const task = Task.create({
      title: "lorem ipsum dolor sit amet",
      text: "lorem ipsum dolor sit amet, consectetur adip",
      expirationDate: new Date(),
      remindDate: new Date(),
      status: "TODO",
      assignTo: "543",
      userId: "123",
      teamId: "345",
    })
    const result = await repository.create(task);
    expect(result).toBeDefined();
  });

  it('should update an existing task', async () => {
    const task = Task.create({
      title: "lorem ipsum dolor sit amet",
      text: "lorem ipsum dolor sit amet, consectetur adip",
      expirationDate: new Date(),
      remindDate: new Date(),
      status: "TODO",
      assignTo: "543",
      userId: "123",
      teamId: "345",
    })
    const result = await repository.update(task);
    expect(result).toBeDefined();
  });

  it('should delete a task by its id', async () => {
    const taskId = "123";
    await expect(repository.delete(taskId)).resolves.not.toThrow();
  });

  it('should find tasks paginated', async () => {
    const page = 1;
    const limit = 10;
    const result = await repository.findPaginated(page, limit);
    expect(result).toHaveLength(0);
  });

  it('should find tasks by property and value', async () => {
    const property = "property";
    const value = "value";
    const result = await repository.findByPropertyAndValue(property, value);
    expect(result).toHaveLength(0);
  });

  it('should find a task by its id', async () => {
    const taskId = "123";
    const result = await repository.findById(taskId);
    expect(result).toBeDefined();
  });

  it('should find all tasks', async () => {
    const result = await repository.find();
    expect(result).toHaveLength(0);
  });
});
