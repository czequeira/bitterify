import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Bind } from '../core/classes/bind.class';
import { getString } from '../utils';

export function a(content: string, href: string): Component;
export function a(content: () => string, href: string, bind: Bind): Component;
export function a(content: string, href: () => string, bind: Bind): Component;
export function a(
  content: () => string,
  href: () => string,
  bind: Bind,
): Component;
export function a(content: any, href: any, bind?: Bind): Component {
  const a = createComponent('a', content);
  a.setAttribute('href', getString(href));
  if (bind) {
    if (typeof content === 'function') a.subscribe(bind);
    if (typeof href === 'function')
      bind.subscribeCallback('id', () => {
        a.setAttribute('href', href());
      });
  }
  return a;
}
