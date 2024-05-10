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

const newTaskDto = {
    id: "123",
    title: "Sample Task",
    text: "This is a sample task description.",
    expirationDate: "01/01/2100 01:01:01",
    remindDate: "01/01/2100 00:00:00",
    status: "TODO",
    assignTo: "John Doe",
    userId: "456",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),

}

const newTask = {
    id: "123",
    title: "Sample Task",
    text: "This is a sample task description.",
    expirationDate: DateUtil.futureDateByHours(30),
    remindDate: DateUtil.futureDateByHours(20),
    status: "TODO",
    assignTo: "John Doe",
    userId: "456",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}


const newTaskUpdated: TaskModel = {
    _id: "123",
    id: "123",
    title: "Simple Task!",
    text: "This is a Simple task description!",
    expirationDate: DateUtil.futureDateByHours(30),
    remindDate: DateUtil.futureDateByHours(20),
    status: "DONE",
    assignTo: "John Doe",
    userId: "456",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:01"),
} as TaskModel

const newTaskUpdatedDto = {
    id: "123",
    title: "Simple Task!",
    text: "This is a Simple task description!",
    status: "DONE",
    assignTo: "John Doe",
    userId: "456",
}


export class MockTaskRepository implements TaskRepositoryInterface {


    async login(task: Task): Promise<TaskModel | null> {
        const result: TaskModel = {
            _id: "123",
            ...newTask
        } as TaskModel;
        return result;
    }


    async create(data: Task): Promise<TaskModel> {
        const result: TaskModel = {
            _id: "123",
            ...newTask
        } as TaskModel;
        return result;
    }


    async find(): Promise<TaskModel[]> {
        const result: TaskModel = {
            _id: "123",
            ...newTask
        } as TaskModel;
        return [result]
    }


    async findById(id: string): Promise<TaskModel> {
        const result: TaskModel = {
            _id: "123",
            ...newTask
        } as TaskModel;
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<TaskModel[]> {
        return []
    }


    async update(dataUpdate: Task): Promise<TaskModel> {
        return newTaskUpdated
    }

    async findPaginated(page: number, limit: number): Promise<TaskModel[]> {
        const result: TaskModel = {
            _id: "123",
            ...newTask
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
            const expected = newTask;
            const result = await taskService.create(newTaskDto);
            expect(result).toEqual(expected);
            schedule.remove("123", () => console.log("task removed"),1)
        });
    });


    describe('update', () => {
        it('should update an task', async () => {
            const data = {
                id: "123",
                title: "Simple Task!",
                text: "This is a Simple task description!",
                expirationDate: "01/01/2100 00:00:00",
                remindDate: "01/01/2100 00:00:00",
                status: "DONE",
                assignTo: "John Doe",
                userId: "456",
            }
            const expected = {
                id: newTaskUpdated.id,
                title: newTaskUpdated.title,
                text: newTaskUpdated.text,
                expirationDate: newTaskUpdated.expirationDate,
                remindDate: newTaskUpdated.remindDate,
                status: newTaskUpdated.status,
                assignTo: newTaskUpdated.assignTo,
                userId: newTaskUpdated.userId,
                createdAt: newTaskUpdated.createdAt,
                updatedAt: newTaskUpdated.updatedAt,
            }

            await taskService.create(newTaskDto);
            const result = await taskService.update(newTaskUpdatedDto);
            expect(result).toEqual(expected);
            schedule.remove("123", () => console.log("task removed"),1)
        });
    });

    describe('findById', () => {
        it('should find an task by id', async () => {
            const expected = newTask;
            await taskService.create(newTask);
            const result = await taskService.findById(newTask.id);
            expect(result).toEqual(expected);
            schedule.remove("123", () => console.log("task removed"),1)
        });
    });

    describe('findPaginated', () => {
        it('should find paginated tasks', async () => {
            const expected = [{

            }];
            const result = await taskService.findPaginated(1, 1);
            expect(result).toEqual(expected);
            schedule.remove("123", () => console.log("task removed"),1)

        });
    });

    describe('findByFieldAndValue', () => {
        it('should find all tasks', async () => {

            const result = await taskService.findByPropertyAndValue("email", "nonExistentEmail@test.com");
            expect(result).toBeNull()

        });
    });
});
