import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-tasks-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { FindAllTasksUseCase } from 'src/usecases/task/find-all-tasks-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-tasks-usecase';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/adapter.request.task';
import { UpdateTaskUseCase } from 'src/usecases/task/update-user-usecase';
import DateUtil from 'src/utils/util.date';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule'; 

@Injectable()
export class TaskService {
    private scheduler = SchedulerService.getInstance();
    constructor(
        private readonly addTaskUseCase: AddTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly FindAllTasksUseCase: FindAllTasksUseCase,
        private readonly findByIdTasksUseCase: FindByIdTasksUseCase,
        private readonly findPaginatedTasksUseCase: FindPaginatedTasksUseCase,
        private readonly findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase,


    ) { }
    async create(data: CreateRequestTaskDto) {
        const newTask = await this.addTaskUseCase.create(data);
        const taskId = newTask.id;

        const expirationDateISO = DateUtil.defaultFormatToISO(data.expirationDate)
        console.log(expirationDateISO)
        const remindDateISO = DateUtil.defaultFormatToISO(data.remindDate)
        console.log(remindDateISO)
        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(expirationDateISO, remindDateISO);

        if (!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();
        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(now, remindDateISO);
        console.log(" now ->",now)
        if (isNowDateSameOrAfter) {
            throw new Error(`Now date not must be same or after of remindDate`);
        }

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now)

        this.scheduler.addScheduler(taskId, async () => {
            const taskFuture = await this.findById(taskId);
            if (!taskFuture) {
                return;
            }
            console.log(`\n
            Reminding to complete task:\n
            Id:${taskId}\n
            Title:${taskFuture.title}\n
            Text:${taskFuture.text}\n
            Expiration:${taskFuture.expirationDate}\n
            Status: ${taskFuture.status}\n
            `);

            this.scheduler.removeScheduler(taskId)
        }, ms);

        return newTask;

    }

    async update(data: UpdateRequestTaskDto) {
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
        return await this.findPaginatedTasksUseCase.findPaginated(page, limit);
    }

    async findByPropertyAndValue(property: string, value: any) {
        return await this.findByPropertyAndValueTasksUseCase.findByPropertyAndValue(property, value);
    }

}
