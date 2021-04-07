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

## Deployment

To deploy the app just need to create a `html` whith a `id = "app"`
tag and import a bundle of the app.
The development server included create the html and bundle the app usin browserify.

## TODO

- Add css class to components
- Add ssr deployment
- Add cdn deployment
- Add dinamic responsive breackpoints
- Add more components:
  - navbar
  - a
  - form
  - input
  - modal
- Add a router
