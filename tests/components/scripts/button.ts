import { app, bind, bitterButton } from '../../../src';

const buttonBind = bind('before click');

const btn = bitterButton(
  () => (buttonBind.value = 'after click'),
  (bind) => bind.value,
  buttonBind,
);

app([btn]);
