import { appendChilds } from '../actions';
import { MountError } from '../errors/mount.error';
import { Bind } from './bind.class';
import { Component } from './component.class';

export class App {
  private htmlElement: HTMLElement;
  private binds: { [name: string]: Bind } = {};

  constructor(private childs: Component[] = [], mountPoint = 'app') {
    const htmlElement = document.getElementById(mountPoint);
    if (htmlElement === null) throw new MountError(mountPoint);
    this.htmlElement = htmlElement;
    appendChilds(htmlElement, childs);
  }

  setChilds(...childs: Component[]): void {
    this.childs = childs;
    appendChilds(this.htmlElement, childs);
  }

  createBind(name: string, value: any = null): Bind {
    const bind = new Bind(value);
    this.binds[name] = bind;
    return bind;
  }
}
