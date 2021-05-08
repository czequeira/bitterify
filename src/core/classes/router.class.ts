import { BitterifyError } from '../errors';
import { Child } from '../types';
import { Component } from './component.class';

const REG_PATCH = /^\w+(\-\w+)*(\/(\w+(\-\w+)*|\$))*$/;

export class Route {
  private path: string;
  private regExp: RegExp;

  constructor(path: string, private view: (args: string[]) => Child) {
    if (!REG_PATCH.test(path)) throw new BitterifyError('invalid path');
    this.path = path;

    let regExp = path.replace(/\//g, '\\/');
    regExp = regExp.replace(/\$/g, '(\\w+)');

    this.regExp = new RegExp(`^\#${regExp}$`);
  }

  getPath(): string {
    return this.path;
  }

  getView(args: string[]): Child {
    return this.view(args);
  }

  getRegExp(): RegExp {
    return this.regExp;
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
    const hash = location.hash;
    const current = this.routes.find((i) => i.getRegExp().test(hash));
    if (current) {
      const args = current.getRegExp().exec(hash);
      this.component.setChildren([current.getView(args?.slice(1) || [])]);
    } else {
      this.component.setChildren([]);
    }
  }

  getComponent(): Component {
    return this.component;
  }
}
