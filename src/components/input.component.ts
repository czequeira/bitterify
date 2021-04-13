import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Bind } from '../core/classes/bind.class';

export function input(bind: Bind, placeholder = ''): Component {
  const input = createComponent('input');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('value', bind.value);
  input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
  return input;
}
