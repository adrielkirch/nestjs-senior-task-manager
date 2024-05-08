import { Model } from 'mongoose';
import { MongodbTaskRepository } from './mongodb-task-repository';
import { TaskModel } from '../../models/task/task.model';
import { TaskProps } from '../../../../../domain/task/task';
import { Task } from '../../../../../domain/task/task';
import { UpdateRequestUserDto } from '../../../../../adapters/request/user.request.dto';
import { StatusEnum } from '../../../../../domain/task/types';
import DateUtil from '../../../../../utils/util.date';

const taskModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<TaskModel>;

const newDate = new Date();

const newTask = {
  title: 'any_title',
  text: 'any_text',
  expirationDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  status: StatusEnum.TODO,
  assignTo: 'assignTo_id',
  userId: 'user_id',
};

const newTaskRequestDto = {
  title: 'any_title',
  text: 'any_text',
  expirationDate: "01/01/2100 00:00:00",
  remindDate: "01/01/2100 00:00:00",
  status: StatusEnum.TODO,
  assignTo: 'assignTo_id',
  userId: 'user_id',
};

describe('MongodbTaskRepository Unit Test', () => {
  let mongodbTaskRepository: MongodbTaskRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbTaskRepository = new MongodbTaskRepository(taskModelMock);
  });

  it('should be defined', () => {
    expect(mongodbTaskRepository).toBeDefined();
  });

  
  it('should create new task', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);

    await mongodbTaskRepository.create(newTaskRequestDto); 
    expect(taskModelMock.create).toHaveBeenCalledWith(newTaskRequestDto);
    expect(taskModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find an array of tasks', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(newTaskRequestDto);
    await mongodbTaskRepository.create(newTaskRequestDto);
    await mongodbTaskRepository.find();
    expect(taskModelMock.create).toHaveBeenCalledWith(newTaskRequestDto);
    expect(taskModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(newTaskRequestDto);

    await mongodbTaskRepository.findById(task.id);

    expect(taskModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(newTaskRequestDto);

    const updateDto: UpdateRequestUserDto = {
      id: task.id,
      // Include properties you want to update
    };
    await mongodbTaskRepository.update(updateDto);

    expect(taskModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should remove a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(newTaskRequestDto);

    await mongodbTaskRepository.delete(task.id);
    expect(taskModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
