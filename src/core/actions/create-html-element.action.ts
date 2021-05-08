import { getString } from '../../utils';
import { Component, Bind } from '../classes';
import { Content, HtmlElement } from '../types';
import { appendChildren } from './append-children.action';

export function createHtmlElement(
  htmlType: string,
  content: Content,
  children: Component[],
  bind?: Bind,
): HtmlElement {
  let htmlElement: HtmlElement;
  const textContent = getString(content, bind);

  if (htmlType !== 'text') {
    htmlElement = document.createElement(htmlType);
    htmlElement.innerText = textContent;
    appendChildren(htmlElement, children);
  } else htmlElement = document.createTextNode(textContent);

  return htmlElement;
}
