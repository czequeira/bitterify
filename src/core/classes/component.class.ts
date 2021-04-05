import { createHtmlElement, refreshContent } from '../actions';
import { Content, Fn, HtmlElement } from '../types';
import { Bind } from './bind.class';
import { Event } from './event.class';

export class Component {
  private htmlElement: HtmlElement;
  // private events: { [name: string]: Event } = {};

  constructor(
    private htmlType = 'text',
    private content: Content = '',
    private childs: Component[] = [],
  ) {
    this.htmlElement = createHtmlElement(htmlType, content, childs);
  }

  getHtmlElement(): HtmlElement {
    return this.htmlElement;
  }

  addEvent(name: string, fn: Fn) {
    const event = new Event(fn);
    this.htmlElement.addEventListener(name, (...args: any[]) =>
      event.exec(...args),
    );
  }

  subscribe(bind: Bind): void {
    bind.subscribe(this);
  }

  refreshContent(): void {
    refreshContent(this.htmlElement, this.content);
  }
}
