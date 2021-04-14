import { createComponent } from '../core';
import { Child } from '../core/types';
import { createComponentFunction } from './utils';

export function p(...childs: Child[]) {
  return createComponent('p', undefined, childs);
}
export const b = createComponentFunction('b');
export const i = createComponentFunction('i');
export const h1 = createComponentFunction('h1');
export const h2 = createComponentFunction('h2');
export const h3 = createComponentFunction('h3');
export const h4 = createComponentFunction('h4');
export const h5 = createComponentFunction('h5');
export const h6 = createComponentFunction('h6');
export const em = createComponentFunction('em');
export const code = createComponentFunction('code');
export const pre = createComponentFunction('pre');
export const strong = createComponentFunction('strong');
export const u = createComponentFunction('u');
