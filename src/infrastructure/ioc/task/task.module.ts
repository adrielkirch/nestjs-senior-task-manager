import { Module } from '@nestjs/common';
import { TaskController } from 'src/controllers/task/task.controller';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbTaskRepository } from 'src/infrastructure/database/mongodb/repositories/task/mongodb-task-repository';
import { TaskService } from 'src/services/task/task.service';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-task-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { FindAllTasksUseCase } from 'src/usecases/task/find-all-task-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-task-usecase';
import { UpdateTaskUseCase } from 'src/usecases/task/update-task-usecase';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete-task-usecase';

/**
 * The TaskModule is responsible for managing / inject task-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the TaskController to handle task-related HTTP requests.
 * It  
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TaskService,
      useFactory: (taskRepo: TaskRepositoryInterface) => {
        return new TaskService(
          new AddTaskUseCase(taskRepo),
          new UpdateTaskUseCase(taskRepo),
          new FindAllTasksUseCase(taskRepo),
          new FindByIdTasksUseCase(taskRepo),
          new FindPaginatedTasksUseCase(taskRepo),
          new FindByPropertyAndValueTasksUseCase(taskRepo),
          new DeleteTaskByIdUseCase(taskRepo),
        );
      },
      inject: [MongodbTaskRepository],
    },
    
  ],
  controllers: [TaskController],
})
export class TaskModule { }
