import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskUseCase } from 'src/usecases/task/add.task.usecase';
import { FindByIdTaskUseCase } from 'src/usecases/task/findById.task.usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/findByPropertyAndValue.task.usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/findPaginated.task.usecase';
import { CreateRequestTaskDto, UpdateRequestTaskDto } from 'src/adapters/request/task.request.dto';
import { UpdateTaskUseCase } from 'src/usecases/task/update.task.usecase';
import DateUtil from 'src/utils/util.date';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete.task.usecase';
import { TaskResponseDto } from 'src/adapters/response/task.response.dto';
import { Task } from 'src/domain/task/task';
import { FindByIdUserUseCase } from 'src/usecases/user/findById.user.usecase';
import { FindByPropertyAndValueProfileUseCase } from 'src/usecases/profile/findByPropertyAndValue.profile.usecase';

@Injectable()
export class TaskService {
    constructor(
        private readonly addTaskUseCase: AddTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly findByIdTasksUseCase: FindByIdTaskUseCase,
        private readonly findPaginatedTasksUseCase: FindPaginatedTasksUseCase,
        private readonly findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase,
        private readonly deleteTaskByIdUseCase: DeleteTaskByIdUseCase,
        private readonly notifierService: NotifierService,
        private readonly findByIdUsersUseCase: FindByIdUserUseCase,
        private readonly findByPropertyAndValueProfilesUseCase: FindByPropertyAndValueProfileUseCase,
    ) { }

    private scheduler = SchedulerService.getInstance();


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
        console.log('Now is ' + now)
        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(now, remindDateISO);
        if (isNowDateSameOrAfter) {
            throw new BadRequestException(`Now date not must be same or after of remindDate`);
        }

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now);
        console.log('min ' + ms / 1000 / 60)
        const cb = this.schedulerCallBack(taskId, task.assignTo)
        this.scheduler.onAdd(taskId, cb, ms);
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

        if (status === 'DONE') {
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
            throw new BadRequestException(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();
        console.log('now ->', now)
        const ms = DateUtil.timeDifferenceInMs(data.remindDate, now);

        console.log('min ' + ms / 1000 / 60)

        this.scheduler.onDelete(taskId, async () => {
            console.log(`Event ${taskId} removed successfully`);
        }, 1)
        this.scheduler.emitRemoveEvent(taskId);

        const cb = this.schedulerCallBack(taskId, task.assignTo)
        this.scheduler.onAdd(taskId, cb, ms);
        this.scheduler.emitAddEvent(taskId)


        return await this.updateTaskUseCase.update(task);
    }


    private schedulerCallBack(taskId: string, userId: string): () => void {
        return () => {
            (async () => {
                const taskFuture = await this.findById(taskId);
                if (!taskFuture) {
                    return;
                }
                const message = `\n
                    Reminding to complete task:\n
                    Now: ${new Date()}\n,
                    Id:${taskId}\n
                    Title:${taskFuture.title}\n
                    Text:${taskFuture.text}\n
                    Expiration:${taskFuture.expirationDate}\n
                    Status: ${taskFuture.status}\n
                `
                console.log(message);

                this.scheduler.onDelete(taskId, async () => {
                    console.log(`Event ${taskId} removed successfully`);
                }, 1000)
                this.scheduler.emitRemoveEvent(taskId);

                const [user, profiles] = await Promise.all([
                    this.findByIdUsersUseCase.findById(userId),
                    this.findByPropertyAndValueProfilesUseCase.findByPropertyAndValue('userId', userId)
                ]);
                const profile = profiles[0];

                const notificationData = {
                    message: `<b>Reminding to complete task:</b><br><p>${message.replaceAll('\n','<br>')}</p>`,
                    subject: `Remeber to finish task: ${taskFuture.title}`,
                    recipients: [user.email]
                }
                if (profile.notifications.includes('email')) {
                    this.notifierService.onNotify('email', notificationData);
                    this.notifierService.emitNotifyEvent('onNotify');
                }

                if (profile.notifications.includes('sms')) {
                    notificationData.recipients = [user.phone]
                    notificationData.message = message;
                    this.notifierService.onNotify('sms', notificationData);
                    this.notifierService.emitNotifyEvent('onNotify');
                }


            })();
        }
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
