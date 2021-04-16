import { app, button, bind, dialog, p } from '../../../src';

const App = app();
const visible = bind(false);

const Button = button(() => (visible.value = !visible.value), 'open');
const Dialog = dialog(visible, [p(['funciona'])]);

App.setChilds([Button, Dialog]);
