import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Bind } from '../core/classes/bind.class';
import { Child } from '../core/types';
import { getChilds } from '../utils';

export function dialog(visible: Bind, childs: Child[]): Component;
export function dialog(
  visible: Bind,
  childs: (bind: Bind) => Child[],
  bind: Bind,
): Component;
export function dialog(visible: Bind, childs: any, bind?: Bind): Component {
  const modal = createComponent('dialog', undefined, getChilds(childs, bind));

  visible.subscribeCallback('modal-visible', () => {
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

  if (bind)
    bind.subscribeCallback('id', (bind: Bind) => {
      modal.setChilds(getChilds(childs, bind));
    });

  return modal;
}
