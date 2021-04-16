import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Bind } from '../core/classes/bind.class';

export function button(fn: () => void, content: string): Component;
export function button(
  fn: () => void,
  content: (bind: Bind) => string,
  bind: Bind,
): Component;
export function button(fn: () => void, content: any, bind?: Bind): Component {
  const button = createComponent('button', content, undefined, bind);
  button.addEvent('click', fn);
  if (bind) button.subscribe(bind);
  return button;
}
