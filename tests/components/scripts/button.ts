import { button } from '../../../src/components';
import { createApp, createBind } from '../../../src/core';

const app = createApp([]);
const buttonBind = createBind('before click');

const btn = button(
  () => (buttonBind.value = 'after click'),
  (bind) => bind.value,
  buttonBind,
);

app.setChilds([btn]);
