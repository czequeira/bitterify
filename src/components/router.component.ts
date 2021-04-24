import { createRoute, createRouter } from '../core';
import { Component } from '../core/classes';
import { Child } from '../core/types';

interface IRoute {
  path: string;
  view: (args: string[]) => Child;
}

export function bitterRouter(routes: IRoute[]): Component {
  return createRouter(
    routes.map((i) => createRoute(i.path, i.view)),
  ).getComponent();
}
