import { article, div, section } from '../../../src/components';
import { createApp } from '../../../src/core';

createApp([section([div(['div 1', div([div(['div 3', article()])])])])]);
