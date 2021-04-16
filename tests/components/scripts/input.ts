import { app, createBind, input, p } from '../../../src';

const App = app();

const text = createBind('not changed');

const Input = input(text, 'placeholder');

const P = p((bind) => [bind.value], text);

App.setChilds([Input, P]);
