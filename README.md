# bitterify

> if your app isn't bitter enough try **bitterify** it

this framework is made from scratch with typescript and we sugest the use of
typescript but if you want you can use javascrpit.

## Installation

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

## Examples

### Hello world

Create a file `src/index.ts` and copy the next code

``` ts
import { app } from "bitterify";

app('Hello world');
```

to run the app with the development serve just modify the `package.json`
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
node_modules/.bin/bitter serve --help
```

### Add more components

now lets create a h1 and a paragraph.
to do this just import the components and use it

``` ts
import { app, h1, p } from "bitterify";

const title = h1('title');
const paragraph = p('this is a paragraph');

app(title, paragraph);
```

### Events

Lets create a button and use the click method:

``` ts
import { app, button } from "bitterify";

const btn = button(() => {
  alert('button clicked');
});

app(btn);
```

### Binds

A bind is a object to add reactive binds to the app,
by example if we want change a text when we click a button:

``` ts
import { app, button, p } from "bitterify";

const application = app();
const count = application.createBind('count', 0);

const btn = button(() => {
  count.value += 1;
});

const paragraph = p(() => `Count: ${count.value}`);
paragraph.subscribe(count);

application.setChilds(paragraph, btn);
```

the binds belongs to a app and we need to subscribe the component to the bind.

### Styles

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

``` ts
import { app, p } from "bitterify";

const P = p('red background');
P.style.background = 'red';

app(P);
```

### Inputs

``` ts
import { app, input, p } from 'bitterify';

const App = app();

const text = App.createBind('text', 'not changed');

const Input = input(text, 'placeholder');

const P = p(() => text.value);

P.subscribe(text);

App.setChilds(Input, P);
```

## Components

|component|param|type|default|description|
|-|-|-|-|-|
|button|fn|Fn|`() => null`|event onclick callback|
||content|Content|`'click me'`|content of the button|
|a|content|Content||the text to show|
||href|Content|`'#'`|the href of the link|
|input|bind|Bind||the value of the input|
||placeholder|string|`''`|the placeholder of the input|
|div|`...childs`|Child[]||the components childs|
|section|`...childs`|Child[]||the components childs|
|article|`...childs`|Child[]||the components childs|
|aside|`...childs`|Child[]||the components childs|
|nav|`...childs`|Child[]||the components childs|
|footer|`...childs`|Child[]||the components childs|
|main|`...childs`|Child[]||the components childs|
|p|`...childs`|Child[]||the components childs|
|b|content|Content||the text to show|
|i|content|Content||the text to show|
|h1|content|Content||the text to show|
|h2|content|Content||the text to show|
|h3|content|Content||the text to show|
|h4|content|Content||the text to show|
|h5|content|Content||the text to show|
|h6|content|Content||the text to show|
|em|content|Content||the text to show|
|code|content|Content||the text to show|
|pre|content|Content||the text to show|
|strong|content|Content||the text to show|
|u|content|Content||the text to show|

## Deployment

To deploy the app just need to create a `html` whith a `id = "app"`
tag and import a bundle of the app.
The development server included create the html and bundle the app usin browserify.

## TODO

- Add ssr deployment
- Add cdn deployment
- Add dinamic responsive breackpoints
- Add more components:
  - form
  - modal
  - col
  - table
  - menu
- Add a router
- Add life cicle hooks
