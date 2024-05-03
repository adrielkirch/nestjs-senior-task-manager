import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskTransformer } from 'src/main/transformers/task/task.transformer';

/**
 * Use case class responsible for loading a task by their ID from the system.
 * This class interacts with the TaskRepositoryInterface to retrieve task data
 * and uses the TaskTransformer to convert the database model to a simplified task representation.
 */
export class FindByIdTasksUseCase {
  /**
   * Constructs a new instance of the FindByIdTasksUseCase class.
   * @param taskRepo An instance of the TaskRepositoryInterface to interact with the task data storage.
   */
  constructor(private readonly taskRepo: TaskRepositoryInterface) {}

  /**
   * Loads a task by their ID from the system.
   * @param id The ID of the task to load.
   * @returns A Promise that resolves to the simplified representation of the loaded task.
   */
  async findById(id: string) {
    // Retrieve the task from the task data storage using the TaskRepositoryInterface.
    const task = await this.taskRepo.findById(id);
    // If task is not found, return null
    if (!task) return null;
    // Transform the database model to a simplified task representation using the TaskTransformer.
    return TaskTransformer.toTask(task);
  }
}
