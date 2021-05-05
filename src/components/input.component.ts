import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { getString } from '../utils';

function inputWithPlaceholder(inputType: string) {
  return function (bind: Bind, placeholder = ''): Component {
    const input = createComponent('input');
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('value', bind.value);
    input.setAttribute('type', inputType);
    input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    return input;
  };
}

function inputWithoutPlaceholder(inputType: string) {
  return function (bind: Bind): Component {
    const input = createComponent('input');
    input.setAttribute('value', bind.value);
    input.setAttribute('type', inputType);
    input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    return input;
  };
}

export const input = inputWithPlaceholder('text');
export const inputPassword = inputWithPlaceholder('password');
export const inputEmail = inputWithPlaceholder('email');
export const inputHidden = inputWithPlaceholder('hidden');
export const inputNumber = inputWithPlaceholder('number');
export const inputSearch = inputWithPlaceholder('search');
export const inputUrl = inputWithPlaceholder('url');

export const inputDate = inputWithoutPlaceholder('date');
export const inputTime = inputWithoutPlaceholder('time');
export const inputDatetimeLocal = inputWithoutPlaceholder('datetime-local');
export const inputFile = inputWithoutPlaceholder('file');
export const inputRange = inputWithoutPlaceholder('range');
export const inputCheckbox = inputWithoutPlaceholder('checkbox');
export const inputColor = inputWithoutPlaceholder('color');

// export const inputRadio = inputWithoutPlaceholder('radio');

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
  const input = createComponent('input');
  input.setAttribute('type', 'reset');
  input.setAttribute('value', content);
  return input;
}
