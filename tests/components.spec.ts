import { mount } from './utils';

describe('componts', () => {
  describe('a', () => {
    test('it should render a "a"', async () => {
      const code = `
const anchor = bitterify.bitterA('link', 'https://example.com');

bitterify.app([anchor]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('a')?.innerText).toBe('link');
      expect(mounted.querySelector('a')?.getAttribute('href')).toBe(
        'https://example.com',
      );
    });
  });

  describe('app', () => {
    test('it should mount a app', async () => {
      const code = `
bitterify.app(['app']);
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('div')?.textContent).toBe('app');
    });
  });

  describe('button', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
const buttonBind = bitterify.bind('before click');

const btn = bitterify.bitterButton(
  () => (buttonBind.value = 'after click'),
  (bind) => bind.value,
  buttonBind,
);

bitterify.app([btn]);
`;
      mounted = await mount(code);
    });

    test('it should mount a button', () => {
      expect(mounted.querySelector('button')).toBeDefined();
    });

    test('it should change button text at click', () => {
      const button = mounted.querySelector('button');
      expect(button?.innerText).toBe('before click');
      button?.click();
      expect(button?.innerText).toBe('after click');
    });
  });

  describe('class', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
const div1 = bitterify.bitterDiv().setClasses('example', 'example2');
const div2 = bitterify.bitterDiv().setClasses('example', 'example2');
const div3 = bitterify.bitterDiv().addClasses('example3', 'example4');
const div4 = bitterify.bitterDiv().addClasses('example3', 'example4');

bitterify.app([div1, div2, div3, div4]);

div2.setClasses('example');
div4.removeClasses('example4');
`;
      mounted = await mount(code);
    });

    test('it should add the example class to the elements', () => {
      expect(mounted.getElementsByClassName('example').length).toBe(2);
    });

    test('it should change the class of a element', () => {
      expect(mounted.getElementsByClassName('example2').length).toBe(1);
    });

    test('it should add a class', () => {
      expect(mounted.getElementsByClassName('example3').length).toBe(2);
    });

    test('it should remove a class', () => {
      expect(mounted.getElementsByClassName('example4').length).toBe(1);
    });
  });

  describe('div', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
bitterify.app([
  bitterify.bitterSection([
    bitterify.bitterDiv(['div 1', bitterify.bitterDiv([bitterify.bitterDiv(['div 3', bitterify.bitterArticle()])])]),
  ]),
]);
`;
      mounted = await mount(code);
    });

    test('it should mount a div', () => {
      expect(mounted.querySelectorAll('div').length).toBeGreaterThan(1);
    });

    test('it should mount all divs', () => {
      const divs = mounted.querySelectorAll('div');

      expect(divs.length).toBe(4);
      expect(divs[3].textContent).toBe('div 3');
      expect(divs[1].textContent).toBe('div 1div 3');
    });

    test('it should mount the section and article', () => {
      expect(mounted.querySelector('section')).toBeTruthy();
      expect(mounted.querySelector('article')).toBeTruthy();
    });
  });

  describe('form', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
const Bind = bitterify.bind(null, 'string');
const input = bitterify.bitterInput(Bind);
const formItem = bitterify.bitterFormItem(input, {
  pattern: '\\d+',
});
const button = bitterify.bitterButton(() => console.log('submited'), 'submit');
const form = bitterify.bitterForm(
  (e) => {
    e.preventDefault();
  },
  [formItem, button],
);

bitterify.app([form]);
`;
      mounted = await mount(code);
    });

    test('it should mount a form', () => {
      expect(mounted.querySelector('form')).toBeTruthy();
    });

    test('it should validate the form', () => {
      const input = mounted.querySelector('input');
      if (input instanceof HTMLInputElement) input.value = 'invalid';

      const submit = mounted.querySelector('button');
      submit?.click();

      expect(input?.matches(':invalid')).toBe(true);
    });
  });

  describe('input', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
const text = bitterify.bind('not changed');

const input = bitterify.bitterInput(text, 'placeholder');

const p = bitterify.bitterP((bind) => [bind.value], text);

bitterify.app([input, p]);
`;
      mounted = await mount(code);
    });

    test('it shoul show the placeholder', () => {
      expect(mounted.querySelector('input')?.placeholder).toBe('placeholder');
    });

    test('it should mount a input and bind to a p', () => {
      const input = mounted.querySelector('input');
      expect(input?.value).toBe('not changed');

      if (input) {
        input.value = 'changed';
        input.dispatchEvent(new Event('input'));
      }

      expect(mounted.querySelector('p')?.innerHTML).toBe('changed');
    });
  });

  describe('layout', () => {
    test('it should render aside, nav and footer', async () => {
      const code = `
bitterify.app([bitterify.bitterNav(), bitterify.bitterAside(), bitterify.bitterMain(), bitterify.bitterFooter()]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('aside')).toBeTruthy();
      expect(mounted.querySelector('nav')).toBeTruthy();
      expect(mounted.querySelector('footer')).toBeTruthy();
      expect(mounted.querySelector('main')).toBeTruthy();
    });
  });

  describe('router', () => {
    let mounted: Document;

    beforeEach(async () => {
      const code = `
const home = () => bitterify.bitterH1('Home');
const about = () => bitterify.bitterH1('About');
const hello = ([name]) => bitterify.bitterH1('Hello '+name);

const aHome = bitterify.bitterA('Home', '#home');
const aAbout = bitterify.bitterA('About', '#about');
const aHello = bitterify.bitterA('Hello', '#hello/Bartolo');

const router = bitterify.bitterRouter([
  { path: 'home', view: home },
  { path: 'about', view: about },
  { path: 'hello/$', view: hello },
]);

bitterify.app([aHome, aAbout, aHello, router]);
`;
      mounted = await mount(code);
    });

    test('it should mount the router', (done) => {
      expect(mounted.querySelector('h1')).toBeNull();

      mounted.querySelector('a')?.click();
      setTimeout(() => {
        expect(mounted.querySelector('h1')?.innerText).toBe('Home');
        done();
      }, 100);
    });

    test('it should mount the dinamic router', (done) => {
      expect(mounted.querySelector('h1')).toBeNull();

      mounted.querySelectorAll('a')[2]?.click();
      setTimeout(() => {
        expect(mounted.querySelector('h1')?.innerText).toBe('Hello Bartolo');
        done();
      }, 100);
    });
  });

  describe('table', () => {
    test('it should mount a table', async () => {
      const code = `
const data = bitterify.bind([
  ['Bartolo', '100'],
  ['Maritza', '20'],
  ['Rozendo', '29'],
]);

const Table = bitterify.bitterTable(data, [
  bitterify.tableColumn('name', (d) => d[0]),
  bitterify.tableColumn('age', (d) => d[1]),
]);

bitterify.app([Table]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('table')).toBeTruthy();
      expect(mounted.querySelectorAll('tr').length).toBe(4);
    });
  });

  describe('text', () => {
    test('it should mount all texts', async () => {
      const code = `
bitterify.app([
  bitterify.bitterP([
    bitterify.bitterP(['p']),
    bitterify.bitterB('b'),
    bitterify.bitterI('i'),
    bitterify.bitterH1('h1'),
    bitterify.bitterH2('h2'),
    bitterify.bitterH3('h3'),
    bitterify.bitterH4('h4'),
    bitterify.bitterH5('h5'),
    bitterify.bitterH6('h6'),
    bitterify.bitterEm('em'),
    bitterify.bitterCode('code'),
    bitterify.bitterPre('pre'),
    bitterify.bitterStrong('strong'),
    bitterify.bitterU('u'),
  ]),
]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelectorAll('p')[1]?.innerHTML).toBe('p');
      expect(mounted.querySelector('b')?.innerText).toBe('b');
      expect(mounted.querySelector('i')?.innerText).toBe('i');
      expect(mounted.querySelector('h1')?.innerText).toBe('h1');
      expect(mounted.querySelector('h2')?.innerText).toBe('h2');
      expect(mounted.querySelector('h3')?.innerText).toBe('h3');
      expect(mounted.querySelector('h4')?.innerText).toBe('h4');
      expect(mounted.querySelector('h5')?.innerText).toBe('h5');
      expect(mounted.querySelector('h6')?.innerText).toBe('h6');
      expect(mounted.querySelector('em')?.innerText).toBe('em');
      expect(mounted.querySelector('code')?.innerText).toBe('code');
      expect(mounted.querySelector('pre')?.innerText).toBe('pre');
      expect(mounted.querySelector('strong')?.innerText).toBe('strong');
      expect(mounted.querySelector('u')?.innerText).toBe('u');
    });
  });
});
