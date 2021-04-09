import { mount } from '../utils';

describe('style', () => {
  test('it should add a style', async () => {
    const mounted = await mount('tests/core/scripts/style.ts');

    const p = mounted.querySelector('p');

    expect(p?.style.background).toBe('red');
  });
});
