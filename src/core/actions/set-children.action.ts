import { Child, HtmlElement } from '../types';
import { childToComponent } from './child-to-component.action';

export function setChildren(htmlElement: HtmlElement, children: Child[]): void {
  if (htmlElement instanceof HTMLElement) {
    htmlElement.childNodes.forEach((i) => i.remove());
    htmlElement.append(
      ...children.map(childToComponent).map((i) => i.getHtmlElement()),
    );
  }
}
