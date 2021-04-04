import { createHtmlElement } from '../actions';
import { Content, HtmlElement } from '../types';

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
}
