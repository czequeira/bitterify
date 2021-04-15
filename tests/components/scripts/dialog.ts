import { app, button, dialog, p } from '../../../src';

const App = app();
const visible = App.createBind('visible', false);

const Button = button(() => (visible.value = !visible.value), 'open');
const Dialog = dialog(visible, [p(['funciona'])]);

App.setChilds([Button, Dialog]);
