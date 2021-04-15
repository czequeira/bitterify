import { mount } from '../utils';

describe('binds', () => {
  test('it should change innerText', async () => {
    const mounted = await mount('tests/core/scripts/bind.ts');

    expect(mounted.querySelector('p')?.innerText).toBe('Bind: changed');
    expect(mounted.querySelector('b')?.innerText).toBe('Bind2: changed');
  });
});
