import uuid from 'uuid-random';
import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Child, Children } from '../core/types';
import { getChildren } from '../utils';

export function dialog(visible: Bind, children: Child[]): Component;
export function dialog(
  visible: Bind,
  children: (bind: Bind) => Child[],
  bind: Bind,
): Component;
export function dialog(
  visible: Bind,
  children: Children,
  bind?: Bind,
): Component {
  const modal = createComponent(
    'dialog',
    undefined,
    getChildren(children, bind),
  );

  const id = uuid();

  visible.subscribeCallback(id, () => {
    const htmlDialogElement = modal.getHtmlElement();
    if (htmlDialogElement instanceof HTMLDialogElement) {
      if (typeof htmlDialogElement.showModal === 'function') {
        if (visible.value === true) htmlDialogElement.showModal();
        else htmlDialogElement.close();
      } else {
        alert('Your browser does not support dialog element!');
      }
    }
  });

  modal.onUnmount(() => visible.unsubscribe(id));

  if (bind) {
    const id = uuid();
    bind.subscribeCallback(id, (bind: Bind) => {
      modal.setChildren(getChildren(children, bind));
    });
    modal.onUnmount(() => bind.unsubscribe(id));
  }

  return modal;
}
