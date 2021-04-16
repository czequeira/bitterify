import {
  bitterB,
  bitterCode,
  bitterEm,
  bitterH1,
  bitterH2,
  bitterH3,
  bitterH4,
  bitterH5,
  bitterH6,
  bitterI,
  bitterP,
  bitterPre,
  bitterStrong,
  bitterU,
} from '../../../src/components';
import { createApp } from '../../../src/core';

createApp([
  bitterP([
    bitterP(['p']),
    bitterB('b'),
    bitterI('i'),
    bitterH1('h1'),
    bitterH2('h2'),
    bitterH3('h3'),
    bitterH4('h4'),
    bitterH5('h5'),
    bitterH6('h6'),
    bitterEm('em'),
    bitterCode('code'),
    bitterPre('pre'),
    bitterStrong('strong'),
    bitterU('u'),
  ]),
]);
