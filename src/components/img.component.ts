import uuid from 'uuid-random';
import { createComponent } from '../core';
import { Bind, Component } from '../core/classes';
import { Content } from '../core/types';

export function img(src: string): Component;
export function img(src: string, alt: string): Component;
export function img(
  src: string,
  alt: (bind: Bind) => string,
  bind: Bind,
): Component;
export function img(src: string, alt?: Content, bind?: Bind): Component {
  const img = createComponent('img');
  img.setAttribute('src', src);
  if (alt && typeof alt === 'string') img.setAttribute('alt', alt);
  if (bind && typeof alt === 'function') {
    const id = uuid();
    img.setAttribute('alt', alt(bind));
    bind.subscribeCallback(id, (bind) => img.setAttribute('alt', alt(bind)));
    img.onUnmount(() => bind.unsubscribe(id));
  }
  return img;
}
