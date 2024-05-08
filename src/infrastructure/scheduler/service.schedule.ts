
export type Timeout = ReturnType<typeof setTimeout>;
import { EventEmitter } from 'events';

export default class SchedulerService {
  private static instance: SchedulerService | null = null;
  private schedulers: Map<string, Timeout>;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.schedulers = new Map();
    this.eventEmitter = new EventEmitter();
  }

  static getInstance(): SchedulerService {
    if (!SchedulerService.instance) {
      SchedulerService.instance = new SchedulerService();
    }
    return SchedulerService.instance;
  }

  add(name: string, callback: () => void, delayInMs: number): void {
    const maxDelay = 2147483647;
    if (delayInMs > maxDelay) {
      const intervals = Math.ceil(delayInMs / maxDelay);
      let remainingDelay = delayInMs;

      for (let i = 0; i < intervals; i++) {
        const currentDelay = Math.min(remainingDelay, maxDelay);
        let cb;

        if (i < intervals - 1) {
          cb = () => console.log(`Current interval: ${i}/${intervals}`);
        } else {
          cb = callback;
        }
        setTimeout(cb, currentDelay);
        remainingDelay -= maxDelay;
      }
      this.emitAddEvent(name, delayInMs); 
      return;
    }
    const timeoutId = setTimeout(callback, delayInMs);
    this.schedulers.set(name, timeoutId);
    this.emitAddEvent(name, delayInMs); 
  }

  remove(name: string): void {
    const timeoutId = this.schedulers.get(name);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.schedulers.delete(name);
      this.emitRemoveEvent(name); 
    }
  }

  emitAddEvent(name: string, delayInMs: number): void {
    this.eventEmitter.emit('onAdd', { name, delayInMs });
  }

  emitRemoveEvent(name: string): void {
    this.eventEmitter.emit('onDelete', name);
  }

  onAdd(callback: (data: { name: string, delayInMs: number }) => void): void {
    this.eventEmitter.on('onAdd', callback);
  }

  onDelete(callback: (name: string) => void): void {
    this.eventEmitter.on('onDelete', callback);
  }
}
