import { createComponent } from '../core';
import { Component } from '../core/classes';

export function img(src: string, alt?: string): Component {
  const img = createComponent('img');
  img.setAttribute('src', src);
  if (alt) img.setAttribute('alt', alt);
  return img;
}
