import { createApp, createComponent } from '../../../src/core';

const app = createApp([]);
const bind = app.createBind('bind', 'click me');
const button = createComponent('button', (bind) => bind.value, undefined, bind);
button.addEvent('click', () => (bind.value = 'clicked'));

button.subscribe(bind);
app.setChilds([button]);
