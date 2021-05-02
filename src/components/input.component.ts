import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Child } from '../core/types';
import { getChild } from '../utils';

export function input(bind: Bind, placeholder = ''): Component {
  const input = createComponent('input');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('value', bind.value);
  input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
  return input;
}

export function inputPassword(bind: Bind, placeholder = ''): Component {
  const input = createComponent('input');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('type', 'password');
  input.setAttribute('value', bind.value);
  input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
  return input;
}

export function inputSubmit(content: string): Component;
export function inputSubmit(
  content: (bind: Bind) => string,
  bind: Bind,
): Component;
export function inputSubmit(content: any, bind?: Bind): Component {
  const input = createComponent('input', content, undefined, bind);
  input.setAttribute('type', 'submit');
  if (bind) input.subscribe(bind);
  return input;
}
