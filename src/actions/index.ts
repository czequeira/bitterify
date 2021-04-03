import { Component } from '../classes';
import { Content, HtmlElement } from '../types';

export function createHtmlElement(
  htmlType: string,
  content: Content,
  childs: Component[],
): HtmlElement {
  let textContent = '';
  let htmlElement: HtmlElement;

  if (typeof content === 'string') textContent = content;
  else textContent = content();

  if (htmlType !== 'text') {
    htmlElement = document.createElement(htmlType);
    htmlElement.innerText = textContent;
    appendChilds(htmlElement, childs);
  } else htmlElement = document.createTextNode(textContent);

  return htmlElement;
}

export function appendChilds(
  htmlElement: HTMLElement,
  childs: Component[],
): void {
  htmlElement.append(...childs.map((child) => child.getHtmlElement()));
}
