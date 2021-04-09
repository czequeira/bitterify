import { createComponent } from '../core';
import { Component } from '../core/classes';
import { Content } from '../core/types';
import { getString } from '../utils';

export function a(content: Content, href: Content = '#'): Component {
  const a = createComponent('a', content);
  const ref = getString(href);
  return a.setAttribute('href', ref);
}
