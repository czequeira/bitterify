import { div } from '../../../src/components';
import { createApp } from '../../../src/core';

createApp(div('div 1', div(div('div 3'))));
