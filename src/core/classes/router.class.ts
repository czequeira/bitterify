import { Child } from '../types';
import { Component } from './component.class';

// TODO:
// - patch correct /^\w+(\-\w+)*(\/(\w+(\-\w+)*|\$))*$/

export class Route {
  constructor(private patch: string, private view: Child) {}

  getPatch(): string {
    return this.patch;
  }

  getView(): Child {
    return this.view;
  }
}

export class Router {
  private component: Component;

  constructor(private routes: Route[]) {
    this.component = new Component('div');
    this.renderView();

    window.onhashchange = () => {
      this.renderView();
    };
  }

  private renderView(): void {
    const current = this.routes.find(
      (i) => i.getPatch() === location.hash.slice(1),
    );
    this.component.setChilds(!!current ? [current.getView()] : []);
  }

  getComponent(): Component {
    return this.component;
  }
}
