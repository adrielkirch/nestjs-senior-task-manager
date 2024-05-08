import DateUtil from '../../utils/util.date';
import { Task, TaskProps } from './task';
import { StatusEnum } from './types';

describe('Task Unit Tests', () => {
  it('should be constructor()', () => {
    const newTask = {
      "title": "Lorem ipsum dolor tortor",
      "text": "Lorem ipsum ...",
      "remindDate": DateUtil.futureDateByHours(10),
      "expirationDate": DateUtil.futureDateByHours(11),
      "status": StatusEnum.TODO,
      "assignTo": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d"
    };
    let taskProps: TaskProps = newTask

    let task = Task.create(taskProps);
    expect(task.props).toEqual({
      ...taskProps,
    });

    taskProps = newTask;

    expect(task.id).toBeDefined();
    task = Task.create(taskProps);
    expect(task.props).toEqual({
      ...taskProps,
    });
  });

  it('should update methods', () => {
    let userProps: TaskProps = {
      "title": "Lorem ipsum dolor tortor",
      "text": "Lorem ipsum ...",
      "remindDate": DateUtil.futureDateByHours(10),
      "expirationDate": DateUtil.futureDateByHours(11),
      "status": StatusEnum.TODO,
      "assignTo": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d"
    };
    const task = Task.create(userProps);
    const newTitle = 'Lorem ipsum dolor tortor!';
    const newText = 'Lorem ipsum.';
    const newStatus = StatusEnum.DONE;
    const newRemindDate = DateUtil.futureDateByHours(11);
    const newExpirationDate = DateUtil.futureDateByHours(11);

    task.updateTitle(newTitle);
    task.updateText(newText);
    task.updateStatus(newStatus);
    task.updateRemindDate(newRemindDate);
    task.updateExpirationDate(newExpirationDate);

    expect(task.title).toBe(newTitle);
    expect(task.text).toBe(newText);
    expect(task.status).toBe(newStatus);
    expect(task.remindDate).toBe(newRemindDate);
    expect(task.expirationDate).toBe(newExpirationDate);
  });

  it('should be toJSON() method', () => {
    const data =  {
      "title": "Lorem ipsum dolor tortor",
      "text": "Lorem ipsum ...",
      "remindDate": DateUtil.futureDateByHours(10),
      "expirationDate": DateUtil.futureDateByHours(11),
      "status": StatusEnum.TODO,
      "assignTo": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d"
    }
    let taskProps: TaskProps = data;
    const task = Task.create(taskProps);
    task.toJSON();
    data['id'] = task.id;
    expect(task.toJSON()).toStrictEqual(data);
  });

});
