import { App, Component } from './classes';
import { Child, Content } from './types';

function childToComponent(child: Child): Component {
  if (child instanceof Component) return child;
  return new Component(undefined, child);
}

export function createApp(...childs: Child[]): App {
  return new App(childs.map(childToComponent));
}

export function createComponent(
  htmlType: string,
  content?: Content,
  childs: Child[] = [],
): Component {
  return new Component(htmlType, content, childs.map(childToComponent));
}
