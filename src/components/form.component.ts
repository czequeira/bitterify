import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Child } from '../core/types';
import { IValidator } from './utils';

export function formItem(input: Component, validator?: IValidator): Component {
  if (validator?.required) input.setAttribute('required', 'true');
  if (validator?.minlength)
    input.setAttribute('minlength', validator.minlength.toString());
  if (validator?.maxlength)
    input.setAttribute('maxlength', validator.maxlength.toString());
  if (validator?.min) input.setAttribute('min', validator.min.toString());
  if (validator?.max) input.setAttribute('max', validator.max.toString());
  if (validator?.type) input.setAttribute('type', validator.type);
  if (validator?.pattern) input.setAttribute('pattern', validator.pattern);
  return input;
}

export function form(
  submit: (event: Event) => void,
  ...formItems: Child[]
): Component {
  const form = createComponent('form', undefined, formItems);
  form.addEvent('submit', submit);
  form.setAttribute('novalidate', 'true');
  return form;
}
