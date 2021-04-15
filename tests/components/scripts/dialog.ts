import { app, button, dialog, b } from '../../../src';

const App = app();
const visible = App.createBind('visible', false);

const Button = button(() => (visible.value = !visible.value));
const Dialog = dialog(visible, [b('funciona')]);

App.setChilds(Button, Dialog);
