
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

  add(name: string, callback: () => void, ms: number): void {
    const maxDelay = 2147483647;
    if (ms > maxDelay) {
      const intervals = Math.ceil(ms / maxDelay);
      let remainingDelay = ms;

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
      return;
    }
    const timeoutId = setTimeout(callback, ms);
    this.schedulers.set(name, timeoutId);

  }


  remove(name: string, callback: () => void, ms: number): void {
    const timeoutId = this.schedulers.get(name);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeout(callback, ms);
      this.schedulers.delete(name);
    }
  }

  emitAddEvent(name: string): void {
    this.eventEmitter.emit('onAdd', name);
  }

  emitRemoveEvent(name: string): void {
    this.eventEmitter.emit('onDelete', name);
  }

  onAdd(name: string, callback: () => void, ms: number): void {
    this.eventEmitter.on('onAdd', () => {
      this.add(name, callback, ms);
    });
  }

  onDelete(name: string, callback: () => void, ms: number): void {
    this.eventEmitter.on('onDelete', () => {
      this.remove(name, callback, ms);
    });
  }
}
