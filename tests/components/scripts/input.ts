import { app, bind, bitterInput, bitterP } from '../../../src';

const text = bind('not changed');

const input = bitterInput(text, 'placeholder');

const p = bitterP((bind) => [bind.value], text);

app([input, p]);
