import { App, Component } from './classes';
import { Child, Content } from './types';

export function createApp(...components: Component[]): App {
  return new App(components);
}

export function createComponent(
  htmlType: string,
  content?: Content,
  childs: Child[] = [],
): Component {
  return new Component(
    htmlType,
    content,
    childs.map((c) => {
      if (c instanceof Component) return c;
      return new Component(undefined, c);
    }),
  );
}
