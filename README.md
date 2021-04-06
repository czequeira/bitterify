# bitterify
> if your app isn't bitter enough try **bitterify** it

this framework is made from scratch with typescript and we sugest the use of typescript but if you want you can use javascrpit.

## Installation
First install the bitterify package

```
$ npm i -s bitterify
```

if you want to use the develpment server then

```
$ npm i -s browserify tsify watchify
```

the development server is optional, if you want you may create your own using webpack or anything as you like.

## Examples

### Hello world

Create a file `src/index.ts` and copy the next code

``` ts
import { app } from "bitterify/lib/components";

app('Hello world');
```

to run the app with the development serve just modify the `package.json` and add the next script:
``` json
"serve": "bitter serve"
```
or just run
```
$ node_modules/.bin/bitter serve
```

your app will be serve at the url: `http://localhost:8080`, for mor options with the cli you can use:
```
$ node_modules/.bin/bitter serve --help
```

### Add more components

now lets create a h1 and a paragraph. to do this just import the components and use it

``` ts
import { app, h1, p } from "bitterify/lib/components";

const title = h1('title');
const paragraph = p('this is a paragraph');

app(title, paragraph);
```
### Events

Lets create a button and use the click method:
``` ts
import { app, button } from "bitterify/lib/components";

const btn = button(() => {
  alert('button clicked');
});

app(btn);
```

### Binds
A bind is a object to add reactive binds to the app, by example if we want change a text when we click a button:
``` ts
import { app, button, p } from "bitterify/lib/components";

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

### How to use it

the idea of **bitterify** is that the code stay clean, and to archive that we propouse the next rules:
