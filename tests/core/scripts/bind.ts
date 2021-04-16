import { createApp, createComponent } from '../../../src/core';

const app = createApp([]);
const bind = app.createBind('bind', 'initial');

const bind2 = app.createBind('bind2', 'initial');
bind.subscribeCallback('bind2', () => (bind2.value = 'changed'));

const p = createComponent(
  'p',
  (bind) => `Bind: ${bind.value}`,
  undefined,
  bind,
);
p.subscribe(bind);

const b = createComponent(
  'b',
  (bind) => `Bind2: ${bind.value}`,
  undefined,
  bind2,
);
b.subscribe(bind2);

app.setChilds([p, b]);

bind.value = 'changed';
