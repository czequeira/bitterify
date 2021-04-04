import { Component } from './component.class';

export class Bind {
  private _value: any;
  private subscribers: Component[] = [];

  constructor(value: any = null) {
    this._value = value;
  }

  subscribe(...components: Component[]) {
    this.subscribers = [...this.subscribers, ...components];
  }

  set value(value: any) {
    this._value = value;
    this.subscribers.forEach((c) => c.refreshContent());
  }

  get value(): any {
    return this._value;
  }
}
