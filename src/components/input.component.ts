import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';

export function bitterInput(bind: Bind, placeholder = ''): Component {
  const input = createComponent('input');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('value', bind.value);
  input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
  return input;
}
