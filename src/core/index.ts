import { App, Component } from './classes';
import { Content } from './types';

export function createApp(...components: Component[]): App {
  return new App(components);
}

export function createComponent(htmlType: string, content: Content): Component {
  return new Component(htmlType, content);
}
