import { childToComponent } from './actions';
import { App, Component } from './classes';
import { Bind } from './classes/bind.class';
import { Child, Content } from './types';

export function createApp(childs: Child[]): App {
  return new App(childs.map(childToComponent));
}

export function createComponent(
  htmlType: string,
  content?: Content,
  childs: Child[] = [],
  bind?: Bind,
): Component {
  return new Component(htmlType, content, childs.map(childToComponent), bind);
}
