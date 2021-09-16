import { Child, HtmlElement } from '../types';
import { childToComponent } from './child-to-component.action';

export function setChildren(htmlElement: HtmlElement, children: Child[]): void {
  if (htmlElement instanceof HTMLElement) {
    const oldChildren: ChildNode[] = [];
    htmlElement.childNodes.forEach((child) => oldChildren.push(child));
    for (const i of oldChildren) {
      i.remove();
    }
    htmlElement.append(
      ...children.map(childToComponent).map((i) => i.getHtmlElement()),
    );
  }
}
