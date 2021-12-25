import uuid from 'uuid-random';
import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Content } from '../core/types';
import { getString } from '../utils';

function inputWithPlaceholder(inputType: string) {
  function input(bind: Bind): Component;
  function input(bind: Bind, placeholder: string): Component;
  function input(
    bind: Bind,
    placeholder: (bind: Bind) => string,
    placeholderBind: Bind,
  ): Component;
  function input(
    bind: Bind,
    placeholder?: Content,
    placeholderBind?: Bind,
  ): Component {
    const input = createComponent('input');
    if (placeholder && typeof placeholder === 'string')
      input.setAttribute('placeholder', placeholder);
    if (placeholderBind && typeof placeholder === 'function') {
      const id = uuid();
      input.setAttribute('alt', placeholder(placeholderBind));
      placeholderBind.subscribeCallback(id, (placeholderBind) =>
        input.setAttribute('placeholder', placeholder(placeholderBind)),
      );
      input.onUnmount(() => placeholderBind.unsubscribe(id));
    }

    const id = uuid();
    bind.subscribeCallback(id, (bind) => {
      const htmlElement = input.getHtmlElement();
      if (htmlElement instanceof HTMLInputElement)
        htmlElement.value = bind.value;
    });
    input.onUnmount(() => bind.unsubscribe(id));

    input.setAttribute('value', bind.value);
    input.setAttribute('type', inputType);
    input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    input.onUnmount(() => {
      input.removeEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    });
    return input;
  }

  return input;
}

function inputWithoutPlaceholder(inputType: string) {
  return function (bind: Bind): Component {
    const input = createComponent('input');
    input.setAttribute('value', bind.value);
    input.setAttribute('type', inputType);
    input.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    input.onUnmount(() => {
      input.removeEvent('input', (arg) => (bind.value = arg.srcElement?.value));
    });

    const id = uuid();
    bind.subscribeCallback(id, (bind) => {
      const htmlElement = input.getHtmlElement();
      if (htmlElement instanceof HTMLInputElement)
        htmlElement.value = bind.value;
    });
    input.onUnmount(() => bind.unsubscribe(id));

    return input;
  };
}

function inputButton(inputType: string) {
  function input(content: string): Component;
  function input(content: (bind: Bind) => string, bind: Bind): Component;
  function input(content: any, bind?: Bind): Component {
    const input = createComponent('input');
    input.setAttribute('type', inputType);
    input.setAttribute('value', getString(content, bind));
    if (bind) {
      const id = uuid();
      bind.subscribeCallback(id, (b) => {
        input.setAttribute('value', content(b));
      });
      input.subscribe(bind);
      input.onUnmount(() => bind.unsubscribe(input.getId()));
    }
    return input;
  }

  return input;
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

export const inputSubmit = inputButton('submit');
export const inputReset = inputButton('reset');
