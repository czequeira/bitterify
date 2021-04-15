import { createApp, createComponent } from '../../../src/core';

const p = createComponent('p', 'Hello world');

createApp([p]);

p.setStyle('background', 'red');
