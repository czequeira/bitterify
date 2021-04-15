import {
  b,
  code,
  em,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  i,
  p,
  pre,
  strong,
  u,
} from '../../../src/components';
import { createApp } from '../../../src/core';

createApp([
  p([
    p(['p']),
    b('b'),
    i('i'),
    h1('h1'),
    h2('h2'),
    h3('h3'),
    h4('h4'),
    h5('h5'),
    h6('h6'),
    em('em'),
    code('code'),
    pre('pre'),
    strong('strong'),
    u('u'),
  ]),
]);
