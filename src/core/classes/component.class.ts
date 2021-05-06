import { createHtmlElement, refreshContent, setChildren } from '../actions';
import { Child, Content, Fn, HtmlElement } from '../types';
import { Bind } from './bind.class';
import { Event } from './event.class';

export class Component {
  private htmlElement: HtmlElement;
  private style: CSSStyleDeclaration | undefined;
  // private events: { [name: string]: Event } = {};

  constructor(
    private htmlType = 'text',
    private content: Content = '',
    children: Component[] = [],
    bind?: Bind,
  ) {
    this.htmlElement = createHtmlElement(htmlType, content, children, bind);
    if (this.htmlElement instanceof HTMLElement)
      this.style = this.htmlElement.style;
  }

  getHtmlElement(): HtmlElement {
    return this.htmlElement;
  }

  getHtmlType(): string {
    return this.htmlType;
  }

  setChilds(children: Child[]): Component {
    setChildren(this.htmlElement, children);
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

  refreshContent(bind: Bind): void {
    refreshContent(this.htmlElement, this.content, bind);
  }
}
