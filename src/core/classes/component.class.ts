import uuid from 'uuid-random';
import { createHtmlElement, refreshContent, setChildren } from '../actions';
import { Callback, Child, Content, Fn, HtmlElement } from '../types';
import { Bind } from './bind.class';
import { Event } from './event.class';

export class Component {
  private id: string;
  private htmlElement: HtmlElement;
  private style: CSSStyleDeclaration | undefined;
  // private events: { [name: string]: Event } = {};
  private mountedCallback: Callback[] = [];
  private unmountCallback: Callback[] = [];
  private beforeUpdateCallback: Callback[] = [];
  private afterUpdateCallback: Callback[] = [];

  constructor(
    private htmlType = 'text',
    private content: Content = '',
    private children: Component[] = [],
    bind?: Bind,
  ) {
    this.id = uuid();
    this.htmlElement = createHtmlElement(htmlType, content, children, bind);
    this.children.forEach((child) => child.execMountedCallback());
    if (this.htmlElement instanceof HTMLElement)
      this.style = this.htmlElement.style;
  }

  getId(): string {
    return this.id;
  }

  getHtmlElement(): HtmlElement {
    return this.htmlElement;
  }

  getHtmlType(): string {
    return this.htmlType;
  }

  setChildren(children: Child[]): Component {
    this.children.forEach((child) => child.execUnmountCallback());
    setChildren(this.htmlElement, children);
    this.children = children.map((child) => {
      if (child instanceof Component) {
        child.execMountedCallback();
        return child;
      }
      return new Component('text', child);
    });
    return this;
  }

  setStyle(property: string, value: string): Component {
    this.style?.setProperty(property, value);
    return this;
  }

  setAttribute(key: string, value: string): Component {
    if (this.htmlElement instanceof HTMLElement)
      this.htmlElement.setAttribute(key, value);

    return this;
  }

  getAttribute(key: string): string | null | undefined {
    if (this.htmlElement instanceof HTMLElement)
      return this.htmlElement.getAttribute(key);
  }

  setClasses(classes: string): Component {
    if (this.htmlElement instanceof HTMLElement)
      this.htmlElement.className = classes;
    return this;
  }

  addClasses(classes: string): Component {
    if (this.htmlElement instanceof HTMLElement)
      this.htmlElement.classList.add(...classes.split(' '));
    return this;
  }

  removeClasses(classes: string): Component {
    if (this.htmlElement instanceof HTMLElement)
      this.htmlElement.classList.remove(...classes.split(' '));
    return this;
  }

  addEvent(name: string, fn: Fn): Component {
    const event = new Event(fn);
    this.htmlElement.addEventListener(name, (...args: any[]) =>
      event.exec(...args),
    );
    return this;
  }

  subscribe(bind: Bind): Component {
    bind.subscribeComponent(this);
    return this;
  }

  async refreshContent(bind: Bind): Promise<void> {
    for (const callback of this.beforeUpdateCallback) await callback();
    refreshContent(this.htmlElement, this.content, bind);
    for (const callback of this.afterUpdateCallback) await callback();
  }

  // Life cycle hooks
  onMounted(callback: Callback): Component {
    this.mountedCallback.push(callback);
    return this;
  }

  onUnmount(callback: Callback): Component {
    this.unmountCallback.push(callback);
    return this;
  }

  onBeforeUpdate(callback: Callback): Component {
    this.beforeUpdateCallback.push(callback);
    return this;
  }

  onAfterUpdate(callback: Callback): Component {
    this.afterUpdateCallback.push(callback);
    return this;
  }

  async execMountedCallback(): Promise<void> {
    for (const callback of this.mountedCallback) await callback();
  }

  async execUnmountCallback(): Promise<void> {
    for (const callback of this.unmountCallback) await callback();
  }
}
