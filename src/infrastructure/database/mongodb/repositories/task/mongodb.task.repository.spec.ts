import { Model } from 'mongoose';
import { MongodbTaskRepository } from 'src/infrastructure/database/mongodb/repositories/task/mongodb.task.repository';
import { TaskModel } from 'src/infrastructure/database/mongodb/models/task/task.model';
import { TaskProps } from 'src/domain/task/task';
import { Task } from 'src/domain/task/task';
import DateUtil from 'src/utils/util.date';

const taskModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<TaskModel>;


const newTask = {
  title: 'any_title',
  text: 'any_text',
  expirationDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  status: 'TODO',
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
    await mongodbTaskRepository.create(task); 
    expect(taskModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find an array of tasks', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(task);
    await mongodbTaskRepository.create(task);
    await mongodbTaskRepository.find();
    expect(taskModelMock.create).toHaveBeenCalledTimes(2);
    expect(taskModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(task);

    await mongodbTaskRepository.findById(task.id);

    expect(taskModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(task);
    
    task.text = 'new text';
    task.status = 'IN_PROGRESS';

   
    await mongodbTaskRepository.update(task);

    expect(taskModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should remove a task by id', async () => {
    const taskProps: TaskProps = newTask;
    const task = Task.create(taskProps);
    await mongodbTaskRepository.create(task);

    await mongodbTaskRepository.delete(task.id);
    expect(taskModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
