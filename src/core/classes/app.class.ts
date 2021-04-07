import { appendChilds } from '../actions';
import { MountError } from '../errors/mount.error';
import { Links, Scripts } from '../types';
import { Bind } from './bind.class';
import { Component } from './component.class';
import { Link } from './link.class';
import {Script} from './script.class';

export class App {
  private htmlElement: HTMLElement;
  private binds: { [name: string]: Bind } = {};

  constructor(private childs: Component[] = [], mountPoint = 'app') {
    const htmlElement = document.getElementById(mountPoint);
    if (htmlElement === null) throw new MountError(mountPoint);
    this.htmlElement = htmlElement;
    appendChilds(htmlElement, childs);
  }

  addLinks(...links: Links): void {
    links.forEach((l) => {
      let link: Link;
      if (typeof l === 'string') link = new Link(l);
      else link = new Link(l.href, l.integrity, l.crossorigin);
      const style = document.createElement('link');
      style.innerHTML = link.getTag();
      document.head.appendChild(style);
    });
  }

  addScripts(...scripts: Scripts): void {
    scripts.forEach((s) => {
      let script: Script;
      if (typeof s === 'string') script = new Script(s);
      else script = new Script(s.src, s.integrity, s.crossorigin);
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = script.getTag();
      document.head.appendChild(scriptElement);
    });
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
