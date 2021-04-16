import { Component } from '../classes';
import { Child } from '../types';

export function childToComponent(child: Child): Component {
  if (child instanceof Component) return child;
  return new Component(undefined, child);
}
