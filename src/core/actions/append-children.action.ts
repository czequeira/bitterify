import { Component } from '../classes';

export function appendChildren(
  htmlElement: HTMLElement,
  children: Component[],
): void {
  htmlElement.append(...children.map((child) => child.getHtmlElement()));
}
