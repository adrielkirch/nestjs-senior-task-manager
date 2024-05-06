import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskTransformer } from 'src/main/transformers/task/task.transformer';

/**
 * Use case class responsible for loading paginated tasks from the system.
 * This class interacts with the TaskRepositoryInterface to retrieve task data
 * and uses the TaskTransformer to convert the database models to simplified task representations.
 */
export class FindPaginatedTasksUseCase {
  /**
   * Constructs a new instance of the FindPaginatedTasksUseCase class.
   * @param taskRepo An instance of the TaskRepositoryInterface to interact with the task data storage.
   */
  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
   * Loads paginated tasks from the system.
   * @returns A Promise that resolves to an array of simplified task representations.
   */
  async findPaginated(page: number, limit: number) { 
    const tasks = await this.taskRepo.findPaginated(page, limit);
    return TaskTransformer.toTasks(tasks);
  }
}
