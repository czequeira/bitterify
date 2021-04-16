import { app, button, bind, form, formItem, input } from '../../../src';

const App = app();
const Bind = bind(null, 'string');
const Input = input(Bind);
const FormItem = formItem(Input, {
  pattern: '\\d+',
});
const Button = button(() => {}, 'submit');
const Form = form(
  (e) => {
    e.preventDefault();
  },
  [FormItem, Button],
);

App.setChilds([Form]);
