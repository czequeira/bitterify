import { childToComponent } from './actions';
import { App, Bind, Component, Route, Router } from './classes';
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

export function createBind(_value: any, _typeof?: string): Bind {
  return new Bind(_value, _typeof);
}

export function createRoute(path: string, view: (args: string[]) => Child): Route {
  return new Route(path, view);
}

export function createRouter(routes: Route[]): Router {
  return new Router(routes);
}
