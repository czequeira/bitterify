import { createApp, createComponent } from '../../../src/core';

const app = createApp();
const bind = app.createBind('bind', 'click me');
const button = createComponent('button', () => bind.value);
button.addEvent('click', () => (bind.value = 'clicked'));

button.subscribe(bind);
app.setChilds(button);
