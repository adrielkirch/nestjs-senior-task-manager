import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-task-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-task-usecase';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { UpdateTaskUseCase } from 'src/usecases/task/update-task-usecase';
import DateUtil from 'src/utils/util.date';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete-task-usecase';
import { TaskResponseDto } from 'src/adapters/response/task.response.dto';
import { Task } from 'src/domain/task/task';

@Injectable()
export class TaskService {
    private scheduler = SchedulerService.getInstance();

    constructor(
        private readonly addTaskUseCase: AddTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly findByIdTasksUseCase: FindByIdTasksUseCase,
        private readonly findPaginatedTasksUseCase: FindPaginatedTasksUseCase,
        private readonly findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase,
        private readonly deleteTaskByIdUseCase: DeleteTaskByIdUseCase,
    ) { }

    async create(data: CreateRequestTaskDto): Promise<TaskResponseDto> {
        const expirationDateISO = DateUtil.defaultFormatToISO(data.expirationDate.toString());
        const remindDateISO = DateUtil.defaultFormatToISO(data.remindDate.toString());
        data.expirationDate = expirationDateISO;
        data.remindDate = remindDateISO;
        
        const task = Task.create(data);
        const newTask = await this.addTaskUseCase.create(task);
        const taskId = newTask.id;
        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(expirationDateISO, remindDateISO);

        if (!isExpirationDateSameOrAfter) {
            throw new BadRequestException(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();

        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(now, remindDateISO);
        if (isNowDateSameOrAfter) {
            throw new BadRequestException(`Now date not must be same or after of remindDate`);
        }

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now);

        this.scheduler.onAdd(taskId, async () => {
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

            this.scheduler.onDelete(taskId, async () => {
                console.log(`Event ${taskId} removed successfully`);
            }, 1000)
            this.scheduler.emitRemoveEvent(taskId);
        }, ms);

        this.scheduler.emitAddEvent(taskId)

        return newTask;

    }

    async update(data: UpdateRequestTaskDto) {
        const existingTask = await this.findById(data.id);
        const taskId = existingTask.id;
        if (!existingTask) {
            throw new NotFoundException('Task does not exist');
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null) {
                    delete data[key];
                }
            }
        }

        const task = Task.create(data, taskId);
        const status = data.hasOwnProperty('status') ? data.status : existingTask.status;

        if (status === "DONE") {
            this.scheduler.onDelete(taskId, async () => {
                console.log(`Event ${taskId} removed successfully`);
            }, 1)
            this.scheduler.emitRemoveEvent(taskId);
            return await this.updateTaskUseCase.update(task);
        } else if (!data.hasOwnProperty('remindDate')) {
            return await this.updateTaskUseCase.update(task);
        } else if (!data.hasOwnProperty('expirationDate') && !data.hasOwnProperty('remindDate')) {
            return await this.updateTaskUseCase.update(task);
        }

        data.expirationDate = data.hasOwnProperty('expirationDate') ? DateUtil.defaultFormatToISO(data.expirationDate.toString()) : existingTask.expirationDate;
        data.remindDate = data.hasOwnProperty('remindDate') ? DateUtil.defaultFormatToISO(data.remindDate.toString()) : existingTask.remindDate;

        console.log('expirationDate ->', data.expirationDate)
        console.log('remindDate ->', data.remindDate)
        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(data.expirationDate, data.remindDate);
        if (!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();
        const ms = DateUtil.timeDifferenceInMs(data.remindDate, now);


        this.scheduler.onDelete(taskId, async () => {
            console.log(`Event ${taskId} removed successfully`);
        }, 1)
        this.scheduler.emitRemoveEvent(taskId);


        this.scheduler.onAdd(taskId, async () => {
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

            this.scheduler.onDelete(taskId, async () => {
                console.log(`Event ${taskId} removed successfully`);
            }, 1000)
            this.scheduler.emitRemoveEvent(taskId);
        }, ms);

        this.scheduler.emitAddEvent(taskId)


        return await this.updateTaskUseCase.update(task);
    }

    async delete(id: string) {
        const task = await this.findByIdTasksUseCase.findById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.deleteTaskByIdUseCase.deleteById(id);
        this.scheduler.onDelete(id, async () => {
            console.log(`Event ${id} removed successfully`);
        }, 1000)
        this.scheduler.emitRemoveEvent(id);
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

    async findByPropertyAndValue<T>(property: string, value: T): Promise<TaskResponseDto[]> {
        return await this.findByPropertyAndValueTasksUseCase.findByPropertyAndValue(property, value);
    }


}
