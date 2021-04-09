import { createApp, createComponent } from '../../../src/core';

const a = createComponent('a', 'Hello world');
a.setAttribute('href', 'https://example.com');
const p = createComponent('p', a.getAttribute('href') || '');

createApp(a, p);
