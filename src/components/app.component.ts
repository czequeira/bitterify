import { createApp } from '../core';
import { App } from '../core/classes';
import { Child } from '../core/types';

export function app(children: Child[] = []): App {
  return createApp(children);
}
