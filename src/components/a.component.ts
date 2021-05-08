import { createComponent } from '../core';
import { Component, Bind } from '../core/classes';
import { Content } from '../core/types';
import { getString } from '../utils';

export function a(content: string, href: string): Component;
export function a(
  content: (bind: Bind) => string,
  href: string,
  bind: Bind,
): Component;
export function a(
  content: string,
  href: (bind: Bind) => string,
  bind: Bind,
): Component;
export function a(
  content: (bind: Bind) => string,
  href: (bind: Bind) => string,
  bind: Bind,
): Component;
export function a(content: Content, href: Content, bind?: Bind): Component {
  const a = createComponent('a', content, undefined, bind);
  a.setAttribute('href', getString(href, bind));
  if (bind) {
    if (typeof content === 'function') a.subscribe(bind);
    if (typeof href === 'function')
      bind.subscribeCallback('id', (b: Bind) => {
        a.setAttribute('href', href(b));
      });
  }
  return a;
}
