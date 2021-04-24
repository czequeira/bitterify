import { mount } from '../utils';

let mounted: Document;

describe('component-router', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/router.ts');
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
