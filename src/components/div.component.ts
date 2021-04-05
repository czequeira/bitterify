import { createComponent } from '../core';
import { Child } from '../core/types';

export function div(...childs: Child[]) {
  return createComponent('div', undefined, childs);
}
