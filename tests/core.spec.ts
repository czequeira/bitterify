import { mount } from './utils';

describe('core', () => {
  describe('attribute', () => {
    test('it should set and get components attributes', async () => {
      const code = `
const a = bitterify.core.createComponent('a', 'Hello world');
a.setAttribute('href', 'https://example.com');
const p = bitterify.core.createComponent('p', a.getAttribute('href') || '');

bitterify.core.createApp([a, p]);
`;
      const mounted = await mount(code);

      const p = mounted.querySelector('p');

      expect(p?.innerText).toBe('https://example.com');
    });
  });

  describe('binds', () => {
    test('it should change innerText', async () => {
      const code = `
const app = bitterify.core.createApp([]);
const bind = bitterify.core.createBind('initial');

const bind2 = bitterify.core.createBind('initial');
bind.subscribeCallback('bind2', () => (bind2.value = 'changed'));

const p = bitterify.core.createComponent(
  'p',
  (bind) => \`Bind: \$\{bind.value\}\`,
  undefined,
  bind,
);
p.subscribe(bind);

const b = bitterify.core.createComponent(
  'b',
  (bind) => \`Bind2: \$\{bind.value\}\`,
  undefined,
  bind2,
);
b.subscribe(bind2);

app.setChildren([p, b]);

bind.value = 'changed';
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('p')?.innerText).toBe('Bind: changed');
      expect(mounted.querySelector('b')?.innerText).toBe('Bind2: changed');
    });
  });

  describe('events', () => {
    test('it should change the button text when click', async () => {
      const code = `
const app = bitterify.core.createApp([]);
const bind = bitterify.core.createBind('click me');
const button = bitterify.core.createComponent('button', (bind) => bind.value, undefined, bind);
button.addEvent('click', () => (bind.value = 'clicked'));

button.subscribe(bind);
app.setChildren([button]);
`;
      const mounted = await mount(code);

      const button = mounted.querySelector('button');
      button?.click();

      expect(button?.innerText).toBe('clicked');
    });
  });

  describe('mount', () => {
    test('it should mount a p with hello world', async () => {
      const code = `
const p = bitterify.core.createComponent('p', 'Hello world');

bitterify.core.createApp([p]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelector('p')?.innerText).toBe('Hello world');
    });
  });

  describe('router', () => {
    test('it should change the component', async (done) => {
      const code = `
const router = bitterify.core.createRouter([
  bitterify.core.createRoute('home', () => 'Home'),
  bitterify.core.createRoute('about', () => 'About'),
  bitterify.core.createRoute('router-with/$/param/$', ([v]) => \`About: \$\{v\}\`),
]);

bitterify.core.createApp(['Router', router.getComponent()]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelectorAll('div')[1]?.innerText).toBe('');

      mounted.location.hash = '#home';
      mounted.dispatchEvent(new Event('hashchange'));
      setTimeout(() => {
        expect(mounted.querySelectorAll('div')[1]?.innerHTML).toBe('Home');
        done();
      }, 0);
    });

    test('it should change the component with params', async (done) => {
      const code = `
const router = bitterify.core.createRouter([
  bitterify.core.createRoute('home', () => 'Home'),
  bitterify.core.createRoute('about', () => 'About'),
  bitterify.core.createRoute('router-with/$/param/$', ([v]) => \`About: \$\{v\}\`),
]);

bitterify.core.createApp(['Router', router.getComponent()]);
`;
      const mounted = await mount(code);

      expect(mounted.querySelectorAll('div')[1]?.innerText).toBe('');

      mounted.location.hash = '#router-with/234/param/123';
      mounted.dispatchEvent(new Event('hashchange'));
      setTimeout(() => {
        expect(mounted.querySelectorAll('div')[1]?.innerHTML).toBe(
          'About: 234',
        );
        done();
      }, 0);
    });
  });

  describe('style', () => {
    test('it should add a style', async () => {
      const code = `
const p = bitterify.core.createComponent('p', 'Hello world');

bitterify.core.createApp([p]);

p.setStyle('background', 'red');
`;
      const mounted = await mount(code);

      const p = mounted.querySelector('p');

      expect(p?.style.background).toBe('red');
    });
  });
});
