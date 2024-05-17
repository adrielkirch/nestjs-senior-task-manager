import SchedulerService, { Timeout } from './service.schedule';
import { EventEmitter } from 'events';

// Mock setTimeout
jest.useFakeTimers();

describe('SchedulerService', () => {
  let schedulerService: SchedulerService;
  let eventEmitterMock: EventEmitter;

  beforeEach(() => {
    schedulerService = SchedulerService.getInstance();
    eventEmitterMock = new EventEmitter();
    // Directly assign the mocked eventEmitter
    (schedulerService as any).eventEmitter = eventEmitterMock;
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should emit "onAdd" event when add is called', () => {
    const name = 'test';
    const callback = jest.fn();
    const ms = 1000;

    schedulerService.onAdd(name, callback, ms);
    schedulerService.emitAddEvent(name);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });

  it('should emit "onDelete" event when remove is called', () => {
    const name = 'test';
    const callback = jest.fn();
    const ms = 1000;

    schedulerService.onDelete(name, callback, ms);
    schedulerService.emitRemoveEvent(name);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});
