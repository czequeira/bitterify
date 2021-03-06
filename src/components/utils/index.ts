import uuid from 'uuid-random';
import { createComponent } from '../../core';
import { Component, Bind } from '../../core/classes';
import { BitterifyError } from '../../core/errors';
import { Child, Children, Content, Contents } from '../../core/types';
import { getChildren, getStrings } from '../../utils';

export function createDinamicContent(htmlType: string) {
  function dinamicContent(content: string): Component;
  function dinamicContent(
    content: (bind: Bind) => string,
    bind: Bind,
  ): Component;
  function dinamicContent(content: Content, bind?: Bind): Component {
    if (typeof content === 'string') return createComponent(htmlType, content);
    if (bind) {
      const dinamicContentComponent = createComponent(
        htmlType,
        content,
        undefined,
        bind,
      );
      dinamicContentComponent.subscribe(bind);
      dinamicContentComponent.onUnmount(() => {
        bind.unsubscribe(dinamicContentComponent.getId());
      });
      return dinamicContentComponent;
    }
    throw new BitterifyError('error');
  }

  return dinamicContent;
}

export function createDinamicChildren(htmlType: string) {
  function dinamicChildren(): Component;
  function dinamicChildren(children: Child[]): Component;
  function dinamicChildren(
    children: (bind: Bind) => Child[],
    bind: Bind,
  ): Component;
  function dinamicChildren(children: Children = [], bind?: Bind): Component {
    const dinamicChildrenComponent = createComponent(
      htmlType,
      undefined,
      getChildren(children, bind),
    );

    if (bind && typeof children === 'function') {
      const id = uuid();
      bind.subscribeCallback(id, (bind: Bind) => {
        dinamicChildrenComponent.setChildren(children(bind));
      });
      dinamicChildrenComponent.onUnmount(() => bind.unsubscribe(id));
    }

    return dinamicChildrenComponent;
  }

  return dinamicChildren;
}

export function createDinamicList(htmlType: string) {
  function dinamicChildren(strings: string[]): Component;
  function dinamicChildren(
    strings: (bind: Bind) => string[],
    bind: Bind,
  ): Component;
  function dinamicChildren(strings: Contents = [], bind?: Bind): Component {
    const lis = getStrings(strings, bind).map((i) => createComponent('li', i));
    const dinamicChildrenComponent = createComponent(htmlType, undefined, lis);

    if (bind && typeof strings === 'function') {
      const id = uuid();
      bind.subscribeCallback(id, (bind: Bind) => {
        dinamicChildrenComponent.setChildren(
          strings(bind).map((i: string) => createComponent('li', i)),
        );
      });
      dinamicChildrenComponent.onUnmount(() => bind.unsubscribe(id));
    }

    return dinamicChildrenComponent;
  }

  return dinamicChildren;
}

export interface IValidator {
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
  type?: string;
  pattern?: string;
}

export interface ISelectOptions {
  value: any;
  label: string;
}
