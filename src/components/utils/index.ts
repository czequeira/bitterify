import { createComponent } from '../../core';
import { Component } from '../../core/classes';
import { Bind } from '../../core/classes/bind.class';
import { BitterifyError } from '../../core/errors';
import { Child } from '../../core/types';
import { getChilds } from '../../utils';

export function createDinamicContent(htmlType: string) {
  function dinamicContent(content: string): Component;
  function dinamicContent(content: () => string, bind: Bind): Component;
  function dinamicContent(content: any, bind?: Bind): Component {
    if (typeof content === 'string') return createComponent(htmlType, content);
    if (bind) {
      const dinamicContentComponent = createComponent(htmlType, content);
      dinamicContentComponent.subscribe(bind);
      return dinamicContentComponent;
    }
    throw new BitterifyError('error');
  }

  return dinamicContent;
}

export function createDinamicChilds(htmlType: string) {
  function dinamicChilds(): Component
  function dinamicChilds(childs: Child[]): Component;
  function dinamicChilds(childs: () => Child[], bind: Bind): Component;
  function dinamicChilds(childs: any = [], bind?: Bind): Component {
    const dinamicChildsComponent = createComponent(
      htmlType,
      undefined,
      getChilds(childs),
    );

    if (bind)
      bind.subscribeCallback('id', () => {
        dinamicChildsComponent.setChilds(childs());
      });

    return dinamicChildsComponent;
  }

  return dinamicChilds;
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
