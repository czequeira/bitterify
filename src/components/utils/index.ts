import { createComponent } from '../../core';
import { Component } from '../../core/classes';
import { Content } from '../../core/types';

export function createComponentFunction(
  htmlType: string,
): (content: Content) => Component {
  return (content: Content) => {
    return createComponent(htmlType, content);
  };
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
