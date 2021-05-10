import { BitterifyError } from '../errors';
import { Subscriber } from '../types';
import { Component } from './component.class';

export class Bind {
  private subscribers: { [id: string]: Subscriber } = {};

  // TODO: Añadir el instanceof tambien
  constructor(private _value: any, private _typeof?: string) {
    if (_value && !_typeof) this._typeof = typeof _value;
    if (_value && _typeof && typeof _value !== _typeof)
      throw new BitterifyError('invalid type');
    if ((_value === undefined || _value === null) && !_typeof)
      throw new BitterifyError('especify type or value');
  }

  subscribeComponent(component: Component): void {
    this.subscribers[component.getId()] = component;
  }

  subscribeCallback(id: string, callback: (bind: Bind) => void): void {
    this.subscribers[id] = callback;
  }

  unsubscribe(id: string): void {
    delete this.subscribers[id];
  }

  set value(value: any) {
    if (typeof value !== this._typeof)
      throw new BitterifyError('incorrect bind type');
    this._value = value;
    for (const index in this.subscribers) {
      const subscriber = this.subscribers[index];
      if (subscriber instanceof Component) subscriber.refreshContent(this);
      else subscriber(this);
    }
  }

  get value(): any {
    return this._value;
  }
}
