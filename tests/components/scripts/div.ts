import {
  app,
  bitterArticle,
  bitterDiv,
  bitterSection,
} from '../../../src/components';

app([
  bitterSection([
    bitterDiv(['div 1', bitterDiv([bitterDiv(['div 3', bitterArticle()])])]),
  ]),
]);
