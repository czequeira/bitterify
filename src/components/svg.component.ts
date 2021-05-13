import { createComponent } from '../core';
import { Component } from '../core/classes';

export function svg(viewBox: string, path: string): Component {
  const Path = createComponent('path');
  Path.setAttribute('d', path);
  const Svg = createComponent('svg', undefined, [Path]);
  Svg.setAttribute('viewBox', viewBox);
  return Svg;
}
