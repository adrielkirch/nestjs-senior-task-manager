import { TaskService } from 'src/services/task/task.service';
import { AddTaskUseCase } from 'src/usecases/task/add-task-usecase';
import { UpdateTaskUseCase } from 'src/usecases/task/update-task-usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/find-by-property-and-value-task-usecase';
import { Task } from 'src/domain/task/task';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task-repository.interface';
import { TaskModel } from 'src/infrastructure/database/mongodb/models/task/task.model';
import DateUtil from 'src/utils/util.date';
import { FindByIdTasksUseCase } from 'src/usecases/task/find-by-id-task-usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/find-paginated-task-usecase';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete-task-usecase';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';

const schedule = SchedulerService.getInstance();

function getTaskData(taskId: string) {
    return {
        id: taskId,
        title: "Sample Task",
        text: "This is a sample task description.",
        expirationDate: DateUtil.defaultFormatToISO("01/01/2099 00:00:00") ,
        remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
        status: "TODO",
        assignTo: "John Doe",
        userId: "456",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    }
}

function getTaskUpdateDataModel(taskId: string): TaskModel {
    return {
        _id: taskId,
        id: taskId,
        title: "Simple Task!",
        text: "This is a Simple task description!",
        expirationDate: DateUtil.defaultFormatToISO("01/01/2100 01:01:01"),
        remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:01"),
        status: "DONE",
        assignTo: "John Doe",
        userId: "456",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00")
    } as TaskModel;
}

function getTaskUpdateData(taskId: string) {
    return {
        id: taskId,
        title: "Simple Task!",
        text: "This is a Simple task description!",
        expirationDate: DateUtil.defaultFormatToISO("01/01/2100 01:01:01"),
        remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:01"),
        status: "DONE",
        assignTo: "John Doe",
        userId: "456",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00")
    } 
}


function getTaskUpdateDataDto(taskId: string){
    return {
        id: taskId,
        title: "Simple Task!",
        text: "This is a Simple task description!",
        status: "DONE",
        assignTo: "John Doe",
        userId: "456",
        expirationDate: "01/01/2100 01:01:01",
        remindDate: "01/01/2100 00:00:01",
        teamId:"543",
    }
}

function getTaskDataDto(taskId: string) {
    return {
        id: taskId,
        title: "Sample Task",
        text: "This is a sample task description.",
        expirationDate: "01/01/2100 01:01:01",
        remindDate: "01/01/2099 00:00:00",
        status: "TODO",
        assignTo: "John Doe",
        userId: "456",
        teamId:"543",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    }
}

export class MockTaskRepository implements TaskRepositoryInterface {

    async create(data: Task): Promise<TaskModel> {
        const result: TaskModel = {
            _id: "123",
            ...getTaskData('123')
        } as TaskModel;
        return result;
    }


    async find(): Promise<TaskModel[]> {
        const result: TaskModel = {
            _id: "123",
            ...getTaskData('123')
        } as TaskModel;
        return [result]
    }


    async findById(id: string): Promise<TaskModel> {
        const result: TaskModel = {
            _id: "123",
            ...getTaskData('123')
        } as TaskModel;
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<TaskModel[]> {
        return []
    }


    async update(dataUpdate: Task): Promise<TaskModel> {
        return getTaskUpdateDataModel('123')
    }

    async findPaginated(page: number, limit: number): Promise<TaskModel[]> {
        const result: TaskModel = {
            _id: "123",
            ...getTaskData('123')
        } as TaskModel;
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}

describe('TaskService', () => {
    let taskService: TaskService;
    let addTaskUseCase: AddTaskUseCase;
    let updateTaskUseCase: UpdateTaskUseCase;
    let findByIdTasksUseCase: FindByIdTasksUseCase;
    let findPaginatedTasksUseCase: FindPaginatedTasksUseCase;
    let findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase;
    let deleteTaskByIdUseCase: DeleteTaskByIdUseCase;

    beforeEach(() => {
        addTaskUseCase = new AddTaskUseCase(new MockTaskRepository());
        updateTaskUseCase = new UpdateTaskUseCase(new MockTaskRepository());
        findByIdTasksUseCase = new FindByIdTasksUseCase(new MockTaskRepository());
        findPaginatedTasksUseCase = new FindPaginatedTasksUseCase(new MockTaskRepository());
        findByPropertyAndValueTasksUseCase = new FindByPropertyAndValueTasksUseCase(new MockTaskRepository())

        taskService = new TaskService(
            addTaskUseCase,
            updateTaskUseCase,
            findByIdTasksUseCase,
            findPaginatedTasksUseCase,
            findByPropertyAndValueTasksUseCase,
            deleteTaskByIdUseCase
        );


    });

    describe('create', () => {
        it('should create a new task', async () => {
            const result = await taskService.create(getTaskDataDto('123'));
            const expected = getTaskData('123');
            expect(result).toEqual(expected);
        });
    });


    describe('update', () => {
        it('should update an task', async () => {

            await taskService.create(getTaskDataDto('123'));
            const result = await taskService.update(getTaskUpdateDataDto('123'));
            const expected = getTaskUpdateData('123')
            expect(result).toEqual(expected);
            
        });
    });

    describe('findById', () => {
        it('should find an task by id', async () => {
            await taskService.create(getTaskDataDto('123'));
            const result = await taskService.findById('123');
            const expected = getTaskData('123');
            expect(result).toEqual(expected);
            
        });
    });

    describe('findPaginated', () => {
        it('should find paginated tasks', async () => {
            const result = await taskService.findPaginated(1, 1);
            const expected = [getTaskData('123')];    
            expect(result).toEqual(expected);
            
        });
    });

    describe('findByFieldAndValue', () => {
        it('should find all tasks', async () => {
            const result = await taskService.findByPropertyAndValue("name", "nonExistentTask");
            expect(result).toBeNull()
        });
    });
});
