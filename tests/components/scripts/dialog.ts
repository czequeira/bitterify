import { app, bind, bitterButton, bitterDialog, bitterP } from '../../../src';

const visible = bind(false);

const Button = bitterButton(() => (visible.value = !visible.value), 'open');
const Dialog = bitterDialog(visible, [bitterP(['funciona'])]);

app([Button, Dialog]);
