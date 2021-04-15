import { createComponent } from '../core';
import { Child } from '../core/types';

export function div(childs: Child[] = []) {
  return createComponent('div', undefined, childs);
}

export function section(childs: Child[] = []) {
  return createComponent('section', undefined, childs);
}

export function article(childs: Child[] = []) {
  return createComponent('article', undefined, childs);
}
