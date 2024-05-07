  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Task } from 'src/domain/task/task';
  import { TaskRepositoryInterface } from '../../../../../data/protocols/db/task/task-repository.interface';
  import { TaskModel } from '../../models/task/task.model';
import { CreateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { UpdateRequestUserDto } from 'src/adapters/request/user.request.dto';

  /**
   * Repository implementation for MongoDB database.
   */
  export class MongodbTaskRepository implements TaskRepositoryInterface {
    /**
     * Creates an instance of MongodbTaskRepository.
     * @param taskCollection The injected Mongoose Model representing the task collection.
     */
    constructor(
      @InjectModel(TaskModel.name)
      private readonly taskCollection: Model<TaskModel>,
    ) { }


    /**
     * Creates a new task document in the database.
     * @param data The task data to be saved.
     * @returns A Promise that resolves to the created task document.
     */
    async create(data: CreateRequestTaskDto): Promise<TaskModel> {
      const result = await this.taskCollection.create(data);
      return result;
    }

    /**
     * Finds all task documents in the database.
     * @returns A Promise that resolves to an array of task documents.
     */
    async find(): Promise<TaskModel[]> {
      return await this.taskCollection.find({}, { __v: false });
    }

    /**
     * Finds a task document by its ID in the database.
     * @param id The ID of the task document to find.
     * @returns A Promise that resolves to the found task document, or null if not found.
     */
    async findById(id: string): Promise<TaskModel> {
      return await this.taskCollection.findOne({ _id: { $eq: id } });
    }


    /**
     * Retrieves all tasks from the data storage that match a specific property and value.
     * @param property The property to search for.
     * @param value The value to search for in the specified property.
     * @returns A Promise that resolves to an array of task documents matching the criteria.
     */
    async findByPropertyAndValue(property: string, value: any): Promise<TaskModel[]> {
      return await this.taskCollection.find({ [property]: value });
    }

    /**
     * Updates a task document in the database.
     * @param id The ID of the task document to update.
     * @param dataUpdate The updated task data.
     * @returns A Promise that resolves to the updated task document.
     */
    async update(dataUpdate: UpdateRequestUserDto): Promise<TaskModel> {
      return await this.taskCollection.findOneAndUpdate(
        { _id: { $eq: dataUpdate.id } },
        { $set: dataUpdate },
        { new: true },
      );
    }

    /**
     * Retrieves paginated tasks from the data storage.
     * @param page The page number for pagination.
     * @param limit The limit of tasks per page.
     * @returns A Promise that resolves to an array of TaskModel representing tasks for the specified page.
     */
    async findPaginated(page: number, limit: number): Promise<TaskModel[]> {
      const skip = (page - 1) * limit;
      return await this.taskCollection.find({}, { __v: false }).skip(skip).limit(limit);
    }

    /**
     * Removes a task document from the database.
     * @param id The ID of the task document to remove.
     * @returns A Promise that resolves when the task document is successfully removed.
     */
    async delete(id: string): Promise<void> {
      await this.taskCollection.deleteOne({ _id: { $eq: id } });
    }


  }
