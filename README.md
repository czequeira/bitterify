# bitterify

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
npm i -s browserify tsify watchify
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

App.setChilds(btn);
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

bitterify.app([aHome, aAbout, aHello, router]);
```

## Deployment

To deploy the app just need to create a `html` whith a `id = "app"`
tag and import a bundle of the app.
The development server included create the html and bundle the app usin browserify.

## TODO

- Add ssr deployment
- Add cdn deployment
- Add production deployment
- Add life cicle hooks
- Add development live server
- Add test ecosystem
