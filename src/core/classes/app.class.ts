import { appendChildren } from '../actions';
import { MountError } from '../errors/mount.error';
import { Links } from '../types';
// import { Bind } from './bind.class';
import { Component } from './component.class';
import { Link } from './link.class';

export class App {
  private htmlElement: HTMLElement;
  // private binds: { [name: string]: Bind } = {};

  constructor(children: Component[] = [], mountPoint = 'app') {
    const htmlElement = document.getElementById(mountPoint);
    if (htmlElement === null) throw new MountError(mountPoint);
    this.htmlElement = htmlElement;
    appendChildren(htmlElement, children);
    children.forEach((child) => child.execMountedCallback());
  }

  addLinks(links: Links): void {
    links.forEach((l) => {
      let link: Link;
      if (typeof l === 'string') link = new Link(l);
      else link = new Link(l.href, l.integrity, l.crossorigin);
      const style = document.createElement('link');
      style.innerHTML = link.getTag();
      document.head.appendChild(style);
    });
  }

  setChildren(children: Component[]): void {
    // this.children = children;
    appendChildren(this.htmlElement, children);
    children.forEach((child) => child.execMountedCallback());
  }

  // createBind(name: string, value: any = null): Bind {
  //   const bind = new Bind(value);
  //   this.binds[name] = bind;
  //   return bind;
  // }
}
