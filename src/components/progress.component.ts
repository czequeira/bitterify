import { createComponent } from '../core';
import { Bind, Component } from '../core/classes';

export function progress(bind: Bind): Component {
  const Progress = createComponent('progress');
  Progress.setAttribute('value', bind.value);
  bind.subscribeCallback('progress-id', (bind) => {
    Progress.setAttribute('value', bind.value);
  });
  Progress.subscribe(bind);
  return Progress;
}
