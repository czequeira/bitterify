import { createApp, createComponent } from '../../../src/core';

const app = createApp();
const bind = app.createBind('bind', 'initial');
const p = createComponent('p', () => `Bind: ${bind.value}`);
p.subscribe(bind);
app.setChilds(p);

bind.value = 'changed';
