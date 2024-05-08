import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-task-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { FindAllTasksUseCase } from 'src/usecases/task/find-all-task-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-task-usecase';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { UpdateTaskUseCase } from 'src/usecases/task/update-task-usecase';
import DateUtil from 'src/utils/util.date';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete-task-usecase';
import { StatusEnum } from 'src/domain/task/types';
import { TaskResponseDto } from 'src/adapters/response/task.response.dto';

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
        private readonly deleteTaskByIdUseCase: DeleteTaskByIdUseCase,


    ) { }

    async create(data: CreateRequestTaskDto): Promise<TaskResponseDto> {
        const newTask = await this.addTaskUseCase.create(data);
        const taskId = newTask.id;

        const expirationDateISO = DateUtil.defaultFormatToISO(data.expirationDate)
        console.log(`expirationDateISO: ${expirationDateISO}`)
        const remindDateISO = DateUtil.defaultFormatToISO(data.remindDate)
        console.log(`remindDateISO: ${remindDateISO}`)

        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(expirationDateISO, remindDateISO);

        if (!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();
        console.log('now ', now);
        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(now, remindDateISO);
        if (isNowDateSameOrAfter) {
            throw new Error(`Now date not must be same or after of remindDate`);
        }

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now)

        this.scheduler.add(taskId, async () => {
            const taskFuture = await this.findById(taskId);
            if (!taskFuture) {
                return;
            }
            console.log(`\n
            Reminding to complete task:\n
            Now: ${new Date()}\n,
            Id:${taskId}\n
            Title:${taskFuture.title}\n
            Text:${taskFuture.text}\n
            Expiration:${taskFuture.expirationDate}\n
            Status: ${taskFuture.status}\n
            `);

            this.scheduler.remove(taskId)
        }, ms);

        return newTask;

    }

    async update(data: UpdateRequestTaskDto) {
        const task = await this.findById(data.id);
        const taskId = task.id;
        if (!task) {
            throw new NotFoundException('Task does not exist');
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null) {
                    delete data[key];
                }
            }
        }

        const status = data.hasOwnProperty('status') ? data.status : task.status;

        if (status === StatusEnum.DONE) {
            this.scheduler.remove(taskId)
            return await this.updateTaskUseCase.update(data);
        } else if (!data.hasOwnProperty('remindDate')) {
            return await this.updateTaskUseCase.update(data);
        } else if (!data.hasOwnProperty('expirationDate') && !data.hasOwnProperty('remindDate')) {
            return await this.updateTaskUseCase.update(data);
        }

        data.expirationDate = data.hasOwnProperty('expirationDate') ? DateUtil.defaultFormatToISO(data.expirationDate.toString()) : task.expirationDate;
        console.log("expirationDate ->", data.expirationDate)
        data.remindDate = data.hasOwnProperty('remindDate') ? DateUtil.defaultFormatToISO(data.remindDate.toString()) : task.remindDate;
        console.log("remindDate ->", data.remindDate)
        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(data.expirationDate, data.remindDate);
        if (!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }

        const now = new Date();
        console.log('now ', now);
        const ms = DateUtil.timeDifferenceInMs(data.remindDate, now)
        console.log('ms', ms)
        this.scheduler.remove(taskId);
        this.scheduler.add(taskId, async () => {
            const taskFuture = await this.findById(taskId);
            if (!taskFuture) {
                return;
            }
            console.log(`\n
            Reminding to complete task:\n
            Now: ${new Date()}\n,
            Id:${taskId}\n
            Title:${taskFuture.title}\n
            Text:${taskFuture.text}\n
            Expiration:${taskFuture.expirationDate}\n
            Status: ${taskFuture.status}\n
            `);

            this.scheduler.remove(taskId)
        }, ms);


        return await this.updateTaskUseCase.update(data);
    }

    async delete(id: string) {
        const task = await this.findByIdTasksUseCase.findById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.deleteTaskByIdUseCase.deleteById(id);
        this.scheduler.remove(id);
    }


    async findById(id: string): Promise<TaskResponseDto> {
        const task = await this.findByIdTasksUseCase.findById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }


    async findPaginated(page: number, limit: number): Promise<TaskResponseDto[]> {
        return await this.findPaginatedTasksUseCase.findPaginated(page, limit);
    }

    async findByPropertyAndValue(property: string, value: any): Promise<TaskResponseDto[]> {
        return await this.findByPropertyAndValueTasksUseCase.findByPropertyAndValue(property, value);
    }

    async findAll(): Promise<TaskResponseDto[]> {
        return await this.FindAllTasksUseCase.findAll();
    }
}
