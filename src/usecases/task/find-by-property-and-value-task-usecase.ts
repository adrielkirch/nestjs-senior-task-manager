import { TaskResponseDto } from 'src/adapters/response/task.response.dto';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskTransformer } from 'src/main/transformers/task/task.transformer';
export class FindByPropertyAndValueTasksUseCase {

  constructor(private readonly taskRepo: TaskRepositoryInterface) { }

  /**
 * Loads a task by their ID from the system.
 * @param property The property to search for.
 * @param value The value of the property to match.
 * @returns A Promise that resolves to the simplified representation of the loaded task, or null if not found.
 */
  async findByPropertyAndValue<T>(property: string, value: T): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepo.findByPropertyAndValue(property, value);
    if (!tasks || tasks.length === 0) return null;
    return TaskTransformer.toTasks(tasks);
  }
}
