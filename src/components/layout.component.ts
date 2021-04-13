import { createComponent } from '../core';
import { Child } from '../core/types';

export function aside(...childs: Child[]) {
  return createComponent('aside', undefined, childs);
}

export function nav(...childs: Child[]) {
  return createComponent('nav', undefined, childs);
}

export function footer(...childs: Child[]) {
  return createComponent('footer', undefined, childs);
}
