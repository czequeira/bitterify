import { createApp } from '../core';
import { App } from '../core/classes';
import { Child } from '../core/types';

export function app(...childs: Child[]): App {
  return createApp(...childs);
}
