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

  subscribeCallback(id: string, callback: (bind: Bind) => void): void {
    this.subscribers.push({ id, callback });
  }

  set value(value: any) {
    this._value = value;
    this.subscribers.forEach((c) => {
      if (c instanceof Component) c.refreshContent(this);
      else c.callback(this);
    });
  }

  get value(): any {
    return this._value;
  }
}
