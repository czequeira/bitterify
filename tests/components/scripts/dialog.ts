import { app, button, createBind, dialog, p } from '../../../src';

const App = app();
const visible = createBind(false);

const Button = button(() => (visible.value = !visible.value), 'open');
const Dialog = dialog(visible, [p(['funciona'])]);

App.setChilds([Button, Dialog]);
