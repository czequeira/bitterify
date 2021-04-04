import { getString } from '../../utils';
import { Component } from '../classes';
import { Content, HtmlElement } from '../types';

export function createHtmlElement(
  htmlType: string,
  content: Content,
  childs: Component[],
): HtmlElement {
  let htmlElement: HtmlElement;
  const textContent = getString(content);

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
): void {
  if (htmlElement instanceof HTMLElement)
    htmlElement.innerText = getString(content);
  else htmlElement.textContent = getString(content);
}

export function appendChilds(
  htmlElement: HTMLElement,
  childs: Component[],
): void {
  htmlElement.append(...childs.map((child) => child.getHtmlElement()));
}
