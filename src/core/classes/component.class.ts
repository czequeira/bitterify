import { createHtmlElement, refreshContent, setChildren } from '../actions';
import { Callback, Child, Content, Fn, HtmlElement } from '../types';
import { Bind } from './bind.class';
import { Event } from './event.class';

export class Component {
  private htmlElement: HtmlElement;
  private style: CSSStyleDeclaration | undefined;
  // private events: { [name: string]: Event } = {};
  private mountedCallback: Callback | undefined;
  private unmountCallback: Callback | undefined;
  private beforeUpdateCallback: Callback | undefined;
  private afterUpdateCallback: Callback | undefined;

  constructor(
    private htmlType = 'text',
    private content: Content = '',
    private children: Component[] = [],
    bind?: Bind,
  ) {
    this.htmlElement = createHtmlElement(htmlType, content, children, bind);
    this.children.forEach((child) => child.execMountedCallback());
    if (this.htmlElement instanceof HTMLElement)
      this.style = this.htmlElement.style;
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
    if (this.beforeUpdateCallback) await this.beforeUpdateCallback();
    refreshContent(this.htmlElement, this.content, bind);
    if (this.afterUpdateCallback) await this.afterUpdateCallback();
  }

  // Life cycle hooks
  onMounted(callback: Callback): Component {
    this.mountedCallback = callback;
    return this;
  }

  onUnmount(callback: Callback): Component {
    this.unmountCallback = callback;
    return this;
  }

  onBeforeUpdate(callback: Callback): Component {
    this.beforeUpdateCallback = callback;
    return this;
  }

  onAfterUpdate(callback: Callback): Component {
    this.afterUpdateCallback = callback;
    return this;
  }

  async execMountedCallback(): Promise<void> {
    if (this.mountedCallback) await this.mountedCallback();
  }

  async execUnmountCallback(): Promise<void> {
    if (this.unmountCallback) await this.unmountCallback();
  }
}
