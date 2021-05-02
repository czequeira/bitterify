import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { getString } from '../utils';

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
  const input = createComponent('input');
  input.setAttribute('type', 'submit');
  input.setAttribute('value', getString(content, bind));
  if (bind) {
    bind.subscribeCallback('bindinput', (b) => {
      input.setAttribute('value', content(b));
    });
    input.subscribe(bind);
  }
  return input;
}

export function inputReset(content: string): Component {
  const input = createComponent('reset');
  input.setAttribute('type', 'submit');
  input.setAttribute('value', content);
  return input;
}
