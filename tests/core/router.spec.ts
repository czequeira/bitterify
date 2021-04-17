import { mount } from '../utils';

describe('router', () => {
  test('it should change the component', async (done) => {
    const mounted = await mount('tests/core/scripts/router.ts');

    expect(mounted.querySelectorAll('div')[1]?.innerText).toBe('');

    mounted.location.hash = '#home';
    mounted.dispatchEvent(new Event('hashchange'));
    setTimeout(() => {
      expect(mounted.querySelectorAll('div')[1]?.innerHTML).toBe('Home');
      done();
    }, 0);
  });

  test('it should change the component with params', async (done) => {
    const mounted = await mount('tests/core/scripts/router.ts');

    expect(mounted.querySelectorAll('div')[1]?.innerText).toBe('');

    mounted.location.hash = '#router-with/234/param/123';
    mounted.dispatchEvent(new Event('hashchange'));
    setTimeout(() => {
      expect(mounted.querySelectorAll('div')[1]?.innerHTML).toBe('About: 234');
      done();
    }, 0);
  });
});
