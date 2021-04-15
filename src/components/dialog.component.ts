import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Bind } from '../core/classes/bind.class';
import { Child } from '../core/types';

export function dialog(visible: Bind, childs: Child[]): Component {
  const modal = createComponent('dialog', undefined, childs);

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

  return modal;
}
