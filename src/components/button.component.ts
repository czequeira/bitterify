import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Content, Fn } from '../core/types';

export function button(
  fn: Fn = () => null,
  content: Content = 'click me',
): Component {
  const button = createComponent('button', content);
  button.addEvent('click', fn);
  return button;
}
