import { getString } from '../../utils';
import { Component } from '../classes';
import { Bind } from '../classes/bind.class';
import { Child, Content, HtmlElement } from '../types';

export function createHtmlElement(
  htmlType: string,
  content: Content,
  childs: Component[],
  bind?: Bind,
): HtmlElement {
  let htmlElement: HtmlElement;
  const textContent = getString(content, bind);

  if (htmlType !== 'text') {
    htmlElement = document.createElement(htmlType);
    htmlElement.innerText = textContent;
    appendChilds(htmlElement, childs);
  } else htmlElement = document.createTextNode(textContent);

  return htmlElement;
}

export function refreshContent(
  htmlElement: HtmlElement,
  content: Content,
  bind: Bind,
): void {
  if (htmlElement instanceof HTMLElement)
    htmlElement.innerText = getString(content, bind);
  else htmlElement.textContent = getString(content, bind);
}

export function childToComponent(child: Child): Component {
  if (child instanceof Component) return child;
  return new Component(undefined, child);
}

export function setChilds(htmlElement: HtmlElement, childs: Child[]): void {
  if (htmlElement instanceof HTMLElement) {
    htmlElement.childNodes.forEach((i) => i.remove());
    htmlElement.append(
      ...childs.map(childToComponent).map((i) => i.getHtmlElement()),
    );
  }
}
export function appendChilds(
  htmlElement: HTMLElement,
  childs: Component[],
): void {
  htmlElement.append(...childs.map((child) => child.getHtmlElement()));
}
