import uuid from 'uuid-random';
import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Content } from '../core/types';
import { getString } from '../utils';
import { ISelectOptions } from './utils';

export function select(bind: Bind, options: ISelectOptions[]): Component;
export function select(
  bind: Bind,
  options: ISelectOptions[],
  placeholder: string,
): Component;
export function select(
  bind: Bind,
  options: ISelectOptions[],
  placeholder: (bind: Bind) => string,
  placeholderBind: Bind,
): Component;
export function select(
  bind: Bind,
  options: ISelectOptions[],
  placeholder?: Content,
  placeholderBind?: Bind,
): Component {
  const select = createComponent('select');
  if (placeholder && typeof placeholder === 'string')
    select.setAttribute('placeholder', placeholder);
  if (placeholderBind && typeof placeholder === 'function') {
    const id = uuid();
    select.setAttribute('alt', placeholder(placeholderBind));
    placeholderBind.subscribeCallback(id, (placeholderBind) =>
      select.setAttribute('placeholder', placeholder(placeholderBind)),
    );
    select.onUnmount(() => placeholderBind.unsubscribe(id));
  }
  select.addEvent('input', (arg) => (bind.value = arg.srcElement?.value));

  select.setChildren(
    options.map((o) =>
      createComponent('option', o.label).setAttribute('value', o.value),
    ),
  );

  select.onUnmount(() => {
    select.removeEvent('input', (arg) => (bind.value = arg.srcElement?.value));
  });
  return select;
}
