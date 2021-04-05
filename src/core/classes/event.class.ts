import { Fn } from '../types';

export class Event {
  constructor(private fn: Fn = () => null) {}

  setFn(fn: Fn): void {
    this.fn = fn;
  }

  exec(...args: any[]): any {
    return this.fn(...args);
  }
}
