import { app, bitterDiv } from '../../../src/components';

const div1 = bitterDiv().setClasses('example', 'example2');
const div2 = bitterDiv().setClasses('example', 'example2');
const div3 = bitterDiv().addClasses('example3', 'example4');
const div4 = bitterDiv().addClasses('example3', 'example4');

app([div1, div2, div3, div4]);

div2.setClasses('example');
div4.removeClasses('example4');
