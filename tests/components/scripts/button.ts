import { button } from '../../../src/components';
import { createApp } from '../../../src/core';

const app = createApp();
const buttonBind = app.createBind('buttonBind', 'before click');

const btn = button(
  () => (buttonBind.value = 'after click'),
  () => buttonBind.value,
);
btn.subscribe(buttonBind);

app.setChilds(btn);
