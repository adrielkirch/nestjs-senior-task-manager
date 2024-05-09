import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskTransformer } from 'src/main/transformers/task/task.transformer';
import { TaskResponseDto } from 'src/adapters/response/task.response.dto';
import { Task } from 'src/domain/task/task';


/**
 * Use case class responsible for adding a new task to the system.
 * This class interacts with the TaskRepositoryInterface to persist the task data
 * and uses the TaskTransformer to convert the database model to a simplified task representation.
 */
export class AddTaskUseCase {
  /**
   * Constructs a new instance of the AddTaskUseCase class.
   * @param taskRepo An instance of the TaskRepositoryInterface to interact with the task data storage.
   */
  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
   * Creates a new task in the system.
   * @param task The task object containing the details of the task to be created.
   * @returns A Promise that resolves to the simplified representation of the created task.
   */
  async create(task: Task): Promise<TaskResponseDto> {
    const taskDb = await this.taskRepo.create(task);
    return TaskTransformer.toTask(taskDb);
  }
}
