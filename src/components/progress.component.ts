import uuid from 'uuid-random';
import { createComponent } from '../core';
import { Bind, Component } from '../core/classes';

export function progress(bind: Bind): Component {
  const Progress = createComponent('progress');
  const id = uuid();
  Progress.setAttribute('value', bind.value);
  bind.subscribeCallback(id, (bind) => {
    Progress.setAttribute('value', bind.value);
  });
  Progress.onUnmount(() => bind.unsubscribe(id));
  return Progress;
}
