import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-tasks-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { FindAllTasksUseCase } from 'src/usecases/task/find-all-tasks-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-tasks-usecase';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/adapter.request.task';
import { SecurityUtil } from 'src/utils/util.security';
import { UpdateTaskUseCase } from 'src/usecases/task/update-user-usecase';

@Injectable()
export class TaskService {
    constructor(
        private readonly addTaskUseCase: AddTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly FindAllTasksUseCase: FindAllTasksUseCase,
        private readonly findByIdTasksUseCase: FindByIdTasksUseCase,
        private readonly findPaginatedTasksUseCase: FindPaginatedTasksUseCase,
        private readonly findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase,

    ) { }
    async create(data: CreateRequestTaskDto)  {
        return await this.addTaskUseCase.create(data);
    }

    async update(data: UpdateRequestTaskDto)  {
        const existingUser = await this.findById(data.id);

        if (!existingUser) {
            throw new NotFoundException('User does not exist');
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null) {
                    delete data[key];
                }
            }
        }
          
        return await this.updateTaskUseCase.update(data);
    }


    async findAll() {
        return await this.FindAllTasksUseCase.findAll();
    }

    async findById(id: string) {
        const task = await this.findByIdTasksUseCase.findById(id);
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        return task;
      }

    async findPaginated(page: number, limit: number) {
        return await this.findPaginatedTasksUseCase.findPaginated(page,limit);
    }

    async findByPropertyAndValue(property: string, value: any) {
        return await this.findByPropertyAndValueTasksUseCase.findByPropertyAndValue(property, value);
    }

}
