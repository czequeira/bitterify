import { app, input, p } from '../../../src';

const App = app();

const text = App.createBind('text', 'not changed');

const Input = input(text, 'placeholder');

const P = p((bind) => [bind.value], text);

App.setChilds([Input, P]);
