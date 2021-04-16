import {
  app,
  bind,
  bitterButton,
  bitterForm,
  bitterFormItem,
  bitterInput,
} from '../../../src';

const Bind = bind(null, 'string');
const input = bitterInput(Bind);
const formItem = bitterFormItem(input, {
  pattern: '\\d+',
});
const button = bitterButton(() => console.log('submited'), 'submit');
const form = bitterForm(
  (e) => {
    e.preventDefault();
  },
  [formItem, button],
);

app([form]);
