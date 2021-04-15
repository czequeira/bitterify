import { Subscriber } from '../types';
import { Component } from './component.class';

export class Bind {
  private _value: any;
  private subscribers: Subscriber[] = [];

  constructor(value: any = null) {
    this._value = value;
  }

  subscribeComponent(component: Component): void {
    this.subscribers.push(component);
  }

  subscribeCallback(id: string, callback: () => void): void {
    this.subscribers.push({ id, callback });
  }

  set value(value: any) {
    this._value = value;
    this.subscribers.forEach((c) => {
      if (c instanceof Component) c.refreshContent();
      else c.callback();
    });
  }

  get value(): any {
    return this._value;
  }
}
