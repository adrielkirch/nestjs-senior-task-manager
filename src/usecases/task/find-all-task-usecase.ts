import { TaskResponseDto } from 'src/adapters/response/task.response.dto';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskTransformer } from 'src/main/transformers/task/task.transformer';

/**
 * Use case class responsible for loading all tasks from the system.
 * This class interacts with the TaskRepositoryInterface to retrieve task data
 * and uses the TaskTransformer to convert the database models to simplified task representations.
 */
export class FindAllTasksUseCase {
  /**
   * Constructs a new instance of the FindAllTasksUseCase class.
   * @param taskRepo An instance of the TaskRepositoryInterface to interact with the task data storage.
   */
  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
   * Loads all tasks from the system.
   * @returns A Promise that resolves to an array of simplified task representations.
   */
  async findAll(): Promise<TaskResponseDto[]> {
    // Retrieve all tasks from the task data storage using the TaskRepositoryInterface.
    const tasks = await this.taskRepo.find();
    // Transform the database models to simplified task representations using the TaskTransformer.
    return TaskTransformer.toTasks(tasks);
  }
}
