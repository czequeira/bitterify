import { Component } from '../classes';

export function appendChilds(
  htmlElement: HTMLElement,
  childs: Component[],
): void {
  htmlElement.append(...childs.map((child) => child.getHtmlElement()));
}
