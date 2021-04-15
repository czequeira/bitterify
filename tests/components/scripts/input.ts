import { app, input, b } from '../../../src';

const App = app();

const text = App.createBind('text', 'not changed');

const Input = input(text, 'placeholder');

const B = b(() => text.value);

B.subscribe(text);

App.setChilds([Input, B]);
