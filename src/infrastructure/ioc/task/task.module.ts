import { Module } from '@nestjs/common';
import { TaskController } from 'src/controllers/task/task.controller';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task.repository.interface';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { MongodbTaskRepository } from 'src/infrastructure/database/mongodb/repositories/task/mongodb.task.repository';
import { TaskService } from 'src/services/task/task.service';
import { AddTaskUseCase } from 'src/usecases/task/add.task.usecase';
import { FindByIdTaskUseCase } from 'src/usecases/task/findById.task.usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/findByPropertyAndValue.task.usecase'
import { FindPaginatedTasksUseCase } from 'src/usecases/task/findPaginated.task.usecase';
import { UpdateTaskUseCase } from 'src/usecases/task/update.task.usecase';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete.task.usecase';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { EmailServiceImpl } from 'src/infrastructure/notifier/email/service/email.service'; 
import { SmsServiceImpl } from 'src/infrastructure/notifier/sms/service/sms.service'; 
import { PushNotificationServiceImpl } from 'src/infrastructure/notifier/push_notification/service/push_notification.service'; 
import { FindByIdUserUseCase } from 'src/usecases/user/findById.user.usecase';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user.repository.interface';
import { FindByPropertyAndValueProfileUseCase } from 'src/usecases/profile/findByPropertyAndValue.profile.usecase';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { MongodbProfileRepository } from 'src/infrastructure/database/mongodb/repositories/profile/mongodb.profile.repository';
import { MongodbUserRepository } from 'src/infrastructure/database/mongodb/repositories/user/mongodb.user.repository';

/**
 * The TaskModule is responsible for managing / inject task-related dependencies and controllers.
 * It imports the DatabaseModule to establish a database connection.
 * It also declares the TaskController to handle task-related HTTP requests. 
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TaskService,
      useFactory: (taskRepo: TaskRepositoryInterface, userRepo: UserRepositoryInterface, profileRepo: ProfileRepositoryInterface) => {
        return new TaskService(
          new AddTaskUseCase(taskRepo),
          new UpdateTaskUseCase(taskRepo),
          new FindByIdTaskUseCase(taskRepo),
          new FindPaginatedTasksUseCase(taskRepo),
          new FindByPropertyAndValueTasksUseCase(taskRepo),
          new DeleteTaskByIdUseCase(taskRepo),
          NotifierService.getInstance(
            new EmailServiceImpl(),
            new SmsServiceImpl(),
            new PushNotificationServiceImpl()
          ),
          new FindByIdUserUseCase(userRepo),
          new FindByPropertyAndValueProfileUseCase(profileRepo),
        );
      },
      inject: [MongodbTaskRepository, MongodbUserRepository, MongodbProfileRepository,],
    },

  ],
  controllers: [TaskController],
})
export class TaskModule { }
