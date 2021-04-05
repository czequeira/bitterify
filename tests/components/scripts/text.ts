import { b, div, h1, h2, h3, h4, h5, i, p } from '../../../src/components';
import { createApp } from '../../../src/core';

createApp(
  div(p('p'), b('b'), i('i'), h1('h1'), h2('h2'), h3('h3'), h4('h4'), h5('h5')),
);
