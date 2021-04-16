import { app, bind, input, p } from '../../../src';

const App = app();

const text = bind('not changed');

const Input = input(text, 'placeholder');

const P = p((bind) => [bind.value], text);

App.setChilds([Input, P]);
