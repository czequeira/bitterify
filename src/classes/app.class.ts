import { appendChilds } from '../actions';
import { MountError } from '../errors/mount.error';
import { Component } from './component.class';

export class App {
  private htmlElement: HTMLElement;

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
}
