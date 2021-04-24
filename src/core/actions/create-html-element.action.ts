import { getString } from '../../utils';
import { Component, Bind } from '../classes';
import { Content, HtmlElement } from '../types';
import { appendChilds } from './append-childs.action';

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