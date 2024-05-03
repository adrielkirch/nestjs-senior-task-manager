import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
export class FindByPropertyAndValueTasksUseCase {

  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
 * Loads a task by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded task, or null if not found.
 */
  async findByPropertyAndValue(property: string, value: any) {
    const task = await this.taskRepo.findByPropertyAndValue(property, value);
    if (!task) return null;
    return task
  }
}
