import { createHtmlElement, refreshContent } from '../actions';
import { Content, HtmlElement } from '../types';
import { Bind } from './bind.class';

export class Component {
  private htmlElement: HtmlElement;

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

  subscribe(bind: Bind): void {
    bind.subscribe(this);
  }

  refreshContent(): void {
    refreshContent(this.htmlElement, this.content);
  }
}
