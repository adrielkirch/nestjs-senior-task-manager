import { TaskModel } from 'src/infrastructure/database/mongodb/models/task/task.model';

/**
 * Utility class for transforming MongoDB task models to a simpler format.
 * This class provides static methods for converting TaskModel objects to a more concise task representation.
 */
export class TaskTransformer {
  /**
   * Transforms a single TaskModel object to a simplified task representation.
   * @param task The TaskModel object to be transformed.
   * @returns An object containing only essential task properties.
   */
  static toTask(task: TaskModel) {
    return {
      id: task._id,                
      title: task.title,            
      text: task.text,      
      created: task.created,  
      updated: task.updated,   
      expirationDate: task.expirationDate,            
      remindDate: task.remindDate,            
      status: task.status,            
      assignTo: task.assignTo,            
      userId: task.userId            
    };
  }

  /**
   * Transforms an array of TaskModel objects to an array of simplified task representations.
   * @param tasks An array of TaskModel objects to be transformed.
   * @returns An array of objects containing essential task properties for each task.
   */
  static toTasks(tasks: TaskModel[]) {
    // Map each TaskModel object to a simplified task representation using the `toTask` method.
    return tasks.map(this.toTask);
  }
}
