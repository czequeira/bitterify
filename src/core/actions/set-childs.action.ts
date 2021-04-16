import { Child, HtmlElement } from '../types';
import { childToComponent } from './child-to-component.action';

export function setChilds(htmlElement: HtmlElement, childs: Child[]): void {
  if (htmlElement instanceof HTMLElement) {
    htmlElement.childNodes.forEach((i) => i.remove());
    htmlElement.append(
      ...childs.map(childToComponent).map((i) => i.getHtmlElement()),
    );
  }
}
