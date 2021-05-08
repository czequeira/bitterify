import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Content } from '../core/types';

export function button(fn: () => void, content: string): Component;
export function button(
  fn: () => void,
  content: (bind: Bind) => string,
  bind: Bind,
): Component;
export function button(
  fn: () => void,
  content: Content,
  bind?: Bind,
): Component {
  const button = createComponent('button', content, undefined, bind);
  button.addEvent('click', fn);
  if (bind) button.subscribe(bind);
  return button;
}
