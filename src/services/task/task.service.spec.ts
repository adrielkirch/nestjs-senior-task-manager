import { TaskService } from 'src/services/task/task.service';
import { AddTaskUseCase } from 'src/usecases/task/add.task.usecase';
import { UpdateTaskUseCase } from 'src/usecases/task/update.task.usecase';
import { FindByPropertyAndValueTasksUseCase } from 'src/usecases/task/findByPropertyAndValue.task.usecase'
import { Task } from 'src/domain/task/task';
import { TaskRepositoryInterface } from 'src/data/protocols/db/task/task.repository.interface';
import { TaskModel } from 'src/infrastructure/database/mongodb/models/task/task.model';
import DateUtil from 'src/utils/util.date';
import { FindByIdTaskUseCase } from 'src/usecases/task/findById.task.usecase';
import { FindPaginatedTasksUseCase } from 'src/usecases/task/findPaginated.task.usecase';
import { DeleteTaskByIdUseCase } from 'src/usecases/task/delete.task.usecase';
import SchedulerService from 'src/infrastructure/scheduler/service.schedule';
import { NotifierService } from 'src/infrastructure/notifier/notifier';
import { EmailServiceInterface } from 'src/data/protocols/notifier/email/email.interface';
import { SmsServiceInterface } from 'src/data/protocols/notifier/sms/sms.interface';
import { FindByIdUserUseCase } from 'src/usecases/user/findById.user.usecase';
import { FindByPropertyAndValueProfileUseCase } from 'src/usecases/profile/findByPropertyAndValue.profile.usecase'
import { ProfileModel } from 'src/infrastructure/database/mongodb/models/profile/profile.model';
import { Profile } from 'src/domain/profile/profile';
import { ProfileRepositoryInterface } from 'src/data/protocols/db/profile/profile-repository.interface';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';
import { User } from 'src/domain/user/user';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user.repository.interface';
import { PushNotificationServiceInterface } from 'src/data/protocols/notifier/push_notification/push.notification.interface';

const schedule = SchedulerService.getInstance();

function getTaskData(taskId: string) {
    return {
        id: taskId,
        title: "Sample Task",
        text: "This is a sample task description.",
        expirationDate: DateUtil.defaultFormatToISO("01/01/2099 00:00:00"),
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


const newUserUpdated: UserModel = {
    _id: "123",
    id: "123",
    email: "john@doe.com",
    name: "John",
    surname: "Doe",
    password: "My_Test_Password123!",
    phone: "+18045551234",
    role: "guest",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:01"),
}

function getTaskUpdateDataDto(taskId: string) {
    return {
        id: taskId,
        title: "Simple Task!",
        text: "This is a Simple task description!",
        status: "DONE",
        assignTo: "John Doe",
        userId: "456",
        expirationDate: "01/01/2100 01:01:01",
        remindDate: "01/01/2100 00:00:01",
        teamId: "543",
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
        teamId: "543",
        createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
        updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    }
}


const newProfile = {
    biography: 'Any biography',
    notifications: ['preference1', 'preference2'],
    gender: 'female',
    image: 'https://example.com/image.png',
    userId: '123',
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
}
const newProfileUpdated: ProfileModel = {
    _id: "123",
    id: "123",
    biography: 'Any biography',
    notifications: ['preference1', 'preference2'],
    gender: 'female',
    image: 'https://example.com/image.png',
    userId: '123',
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
} as ProfileModel;

const newUser = {
    id: "123",
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    phone: "+18045551234",
    password: "My_Test_Password123!",
    role: "guest",
    createdAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
    updatedAt: DateUtil.defaultFormatToISO("01/01/2000 00:00:00"),
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

export class EmailServiceMock implements EmailServiceInterface {
    async send(recipients: string[], subject: string, html: string) {

    }
}

export class SmsServiceMock implements SmsServiceInterface {
    async send(recipients: string[], message: string) {

    }
}

export class PushNotificationServiceMock implements PushNotificationServiceInterface {
    async send(recipients: string[], message: string) {

    }
}


export class MockUserRepository implements UserRepositoryInterface {


    async login(user: User): Promise<UserModel | null> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }


    async create(data: User): Promise<UserModel> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }


    async find(): Promise<UserModel[]> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return [result]
    }


    async findById(id: string): Promise<UserModel> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<UserModel[]> {

        return []
    }


    async update(dataUpdate: User): Promise<UserModel> {
        return newUserUpdated
    }

    async findPaginated(page: number, limit: number): Promise<UserModel[]> {
        const result: UserModel = {
            _id: "123",
            ...newUser
        }
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}



export class MockProfileRepository implements ProfileRepositoryInterface {
    async login(profile: Profile): Promise<ProfileModel | null> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async create(data: Profile): Promise<ProfileModel> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async findById(id: string): Promise<ProfileModel> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return result;
    }

    async findByPropertyAndValue<T>(property: string, value: T): Promise<ProfileModel[]> {
        return []
    }

    async update(dataUpdate: Profile): Promise<ProfileModel> {
        return newProfileUpdated
    }

    async findPaginated(page: number, limit: number): Promise<ProfileModel[]> {
        const result: ProfileModel = {
            _id: "123",
            id: "123",
            ...newProfile
        } as ProfileModel;
        return [result];
    }

    async delete(id: string): Promise<void> {

    }
}


describe('TaskService', () => {
    let taskService: TaskService;
    let addTaskUseCase: AddTaskUseCase;
    let updateTaskUseCase: UpdateTaskUseCase;
    let findByIdTasksUseCase: FindByIdTaskUseCase;
    let findPaginatedTasksUseCase: FindPaginatedTasksUseCase;
    let findByPropertyAndValueTasksUseCase: FindByPropertyAndValueTasksUseCase;
    let deleteTaskByIdUseCase: DeleteTaskByIdUseCase;
    let notifierService: NotifierService;
    let findByIdUsersUseCase: FindByIdUserUseCase;
    let findByPropertyAndValueProfilesUseCase: FindByPropertyAndValueProfileUseCase;
    beforeEach(() => {
        addTaskUseCase = new AddTaskUseCase(new MockTaskRepository());
        updateTaskUseCase = new UpdateTaskUseCase(new MockTaskRepository());
        findByIdTasksUseCase = new FindByIdTaskUseCase(new MockTaskRepository());
        findPaginatedTasksUseCase = new FindPaginatedTasksUseCase(new MockTaskRepository());
        findByPropertyAndValueTasksUseCase = new FindByPropertyAndValueTasksUseCase(new MockTaskRepository())
        findByIdUsersUseCase = new FindByIdUserUseCase(new MockUserRepository());
        findByPropertyAndValueProfilesUseCase = new FindByPropertyAndValueProfileUseCase(new MockProfileRepository());
        findByPropertyAndValueTasksUseCase = new FindByPropertyAndValueTasksUseCase(new MockTaskRepository())
        notifierService = NotifierService.getInstance(
            new EmailServiceMock(),
            new SmsServiceMock(),
            new SmsServiceMock(),
        );
        taskService = new TaskService(
            addTaskUseCase,
            updateTaskUseCase,
            findByIdTasksUseCase,
            findPaginatedTasksUseCase,
            findByPropertyAndValueTasksUseCase,
            deleteTaskByIdUseCase,
            notifierService,
            findByIdUsersUseCase,
            findByPropertyAndValueProfilesUseCase
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
