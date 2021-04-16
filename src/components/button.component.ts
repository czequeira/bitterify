import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';

export function bitterButton(fn: () => void, content: string): Component;
export function bitterButton(
  fn: () => void,
  content: (bind: Bind) => string,
  bind: Bind,
): Component;
export function bitterButton(
  fn: () => void,
  content: any,
  bind?: Bind,
): Component {
  const button = createComponent('button', content, undefined, bind);
  button.addEvent('click', fn);
  if (bind) button.subscribe(bind);
  return button;
}
