import { app, button, form, formItem, input } from '../../../src';

const App = app();
const Bind = App.createBind('input');
const Input = input(Bind);
const FormItem = formItem(Input, {
  pattern: '\\d+',
});
const Button = button();
const Form = form(
  (e) => {
    e.preventDefault();
  },
  FormItem,
  Button,
);

App.setChilds(Form);
