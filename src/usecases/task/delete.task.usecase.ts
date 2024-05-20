import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task.repository.interface';

/**
 * Use case class responsible for deleting a task by its ID from the system.
 * This class interacts with the TaskRepositoryInterface to delete task data.
 */
export class DeleteTaskByIdUseCase {
  /**
   * Constructs a new instance of the DeleteTaskByIdUseCase class.
   * @param taskRepo An instance of the TaskRepositoryInterface to interact with the task data storage.
   */
  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
   * Deletes a task by its ID from the system.
   * @param id The ID of the task to delete.
   * @returns A Promise that resolves to a boolean indicating whether the task was successfully deleted.
   */
  async deleteById(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
