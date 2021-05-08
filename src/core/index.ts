import { childToComponent } from './actions';
import { App, Bind, Component, Route, Router } from './classes';
import { Child, Content } from './types';

export function createApp(children: Child[]): App {
  return new App(children.map(childToComponent));
}

export function createComponent(
  htmlType: string,
  content?: Content,
  children: Child[] = [],
  bind?: Bind,
): Component {
  return new Component(htmlType, content, children.map(childToComponent), bind);
}

export function createBind(_value: any, _typeof?: string): Bind {
  return new Bind(_value, _typeof);
}

export function createRoute(
  path: string,
  view: (args: string[]) => Child,
): Route {
  return new Route(path, view);
}

export function createRouter(routes: Route[]): Router {
  return new Router(routes);
}
