# bitterify

![npm](https://img.shields.io/npm/v/bitterify)
![NPM](https://img.shields.io/npm/l/bitterify)
![npm](https://img.shields.io/npm/dw/bitterify)
![npm bundle size](https://img.shields.io/bundlephobia/min/bitterify)

> if your app isn't bitter enough try **bitterify** it

**Bitterify** proposes a way to develop frontend applications without using tag
syntax such as jsx, xml or html, instead we suggest using functions that
generate the components dynamically

This framework is made from scratch with typescript and we sugest the use of
typescript but if you want you can use javascrpit.

## Getting started

### Installation

First install the bitterify package

``` sh
npm i -s bitterify
```

if you want to use the develpment server then

``` sh
npm i -s browserify tsify watchify typescript commander
```

the development server is optional,
if you want you may create your own using webpack or anything as you like.

### Hello world

Create a file `src/index.ts` and copy the next code

``` ts
import { app } from 'bitterify';

app(['Hello world']);
```

to run the app with the development serve modify the `package.json`
and add the next script:

``` json
"serve": "bitter serve"
```

or just run

``` sh
node_modules/.bin/bitter serve
```

your app will be serve at the url: `http://localhost:8080`, for mor options
with the cli you can use:

``` sh
node_modules/.bin/bitter --help
```

### Add more components

now lets create a `h1` and a `paragraph`.
to do this just import the components and use it

``` ts
import { app, h1, p } from 'bitterify';

const title = h1('title');
const paragraph = p(['this is a paragraph']);

app([title, paragraph]);
```

### Events

Lets create a button and use the click method:

``` ts
import { app, button } from 'bitterify';

const btn = button(() => {
  alert('button clicked');
}, 'alert');

app([btn]);
```

For convenience, the `button` component receives the callback function of
the click event as the first parameter and the button text as the second parameter.

### Binds

A bind is a object to add reactive binds to the app,
by example if we want change a text when we click a button:

``` ts
import { app, button, b, bind } from 'bitterify';

const count = bind(0);

const btn = button(() => {
  count.value += 1;
}, 'plus one');

const bold = b((c) => `Count: ${c.value}`, count);

app([btn, bold]);
```

The `b` function accepts either a string as the only parameter or a
function that accepts a `bind` as a parameter and returns a string and is
passed the `bind` to inject as the second parameter.

### Others examples

#### Styles

The css files can be imported with the `addLinks` method of the app and then
use any class with the component methods `addClasses`, `setClasses` and `removeClasses`
or use the style property of the components.

The next example show how to use the [Bulma][https://bulma.io/] framework.

``` ts
import { app, button } from "bitterify";

const App = app();
App.addLinks('https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css');

const btn = button(() => {
  alert('button clicked');
}).setClasses('button');

App.setChildren(btn);
```

#### Inputs

The `input` component accepts two parameters, the `bind` where the input
value is stored and the placeholder.

``` ts
import { app, bind, input, b } from 'bitterify';

const text = bind('not changed');

const Input = input(text, 'placeholder');

const P = p((bind) => [bind.value], text);

app([Input, P]);
```

#### Table

``` ts
import { app, bind, table, tableColumn } from 'bitterify';

const data = bind([
  ['Bartolo', '100'],
  ['Maritza', '20'],
  ['Rozendo', '29'],
]);

const Table = table(data, [
  tableColumn('name', (d) => d[0]),
  tableColumn('age', (d) => d[1]),
]);

app([Table]);
```

#### Router

``` ts
import { a, app, h1, router } from 'bitterify';

const home = () => h1('Home');
const about = () => h1('About');
const hello = ([name]) => h1('Hello '+name);

const aHome = a('Home', '#home');
const aAbout = a('About', '#about');
const aHello = a('Hello', '#hello/Bartolo');

const router = router([
  { path: 'home', view: home },
  { path: 'about', view: about },
  { path: 'hello/$', view: hello },
]);

app([aHome, aAbout, aHello, router]);
```

## Life cycle hooks

The life cycle hooks of a bitterify component are:

- onMounted:
  - runs after the component is mounted.
- onUnmount
  - runs when the component is to be dismounted.
- onBeforeUpdate and onAfterUpdate:
  - runs before and after updating the component.

``` ts
import { app, b } from 'bitterify';

const B = b('Hello').onMounted(() => console.log('mounted'));

app(B);
```

## Componets

|name|params|descriptions|
|-|-|-|
|a|`content: string, href: string`|statics strings|
||`content: (bind: Bind) => string, href: string, bind: Bind`|dynamic content|
||`content: (bind: Bind) => string, href: (bind: Bind) => string, bind: Bind`|dynamic content and href|
|button|`fn: () => void, content?: string`|callback function to event click and static content|
||`fn: () => void, content: (bind: Bind) => string, bind: Bind`|callback function to click event and dynamic content|
|dialog|`visible: Bind, children: Child[]`|boolean bind to sync the visible state and static children|
||`visible: Bind, children: (bind: Bind) => Child[], bind: Bind`|boolean bind to sync the visible state and dynamic children|
|div, section, article, aside, header, nav, footer, main, p|`children: Child[]`|static children|
||`children: (bind: Bind) => Child[], bind: Bind`|dynamic children|
|formItem|`input: Component, validator: IValidator`|the input and the validators rules|
|form|`submit: (event: Event) => void, formItems: Child[]`|callback function to submit event and children|
|input, inputPassword, inputEmail, inputHidden, inputNumber, inputSearch, inputUrl|`bind: Bind, placeholder?: string`|the bind to the value of the input and a optional static placeholder|
||`bind: Bind, placeholder: (bind: Bind) => string, placeholderBind: Bind`|the bind to the value of the input and a dynamical placeholder|
|inputDate, inputTime, inputDatetimeLocal, inputFile, inputRange, inputCheckbox, inputColor|`bind: Bind`|the bind to the value attribute|
|inputSubmit, inputReset|`content: string`|static content of the submit button|
||`content: (bind: Bind) => string, bind: Bind`|dynamic content to the submit button|
|ol, ul|`strings: string[]`|static string to create the `<li>` items|
||`(bind: Bind) => string[], bind: Bind`|dynamic `<li>` items|
|router|`routes: IRoute[]`|the collection of routes|
|tableColumn|`header: string, body: (arg: any) => Child`|the header of a table column and the function to populate a cell of the column|
|table|`bind: Bind, tableColumn: ITableColumn`|the data array to create the table and de columns|
|b, i, h1, h2, h3, h4, h5, h6, em, code, pre, strong, u|`content: string`|static content|
||`content: (bind: Bind) => string, bind: Bind`|dynamic content|
|progress|`bind: Bind`|the bind to the value attribute|
|img|`src: string, alt?: string`|the `src` and `alt` attributes of a `<img>`|
||`src: string, alt: (bind: Bind) => string, bind: Bind`|the `src` and a dynamic `alt` attributes of a `<img>`|
|svg|`viewBox: string, path: string`|the `viewBox` attribute of the `<svg>` and the `d` attribute of the `<path>`|

## Deployment

To deploy the app just need to create a `html` with a `id = "app"`
tag and import a bundle of the app.
The development server included create the html and bundle the app using browserify.

## TODO

- Add ssr deployment
- Add cdn deployment
- Add development live server
- Add test ecosystem
- Add literal html inject to the components
- Add components
  - dinamic table headers
  - radio
  - label
- Add a change log to the docs
- Put a middleware mechanism to the router
