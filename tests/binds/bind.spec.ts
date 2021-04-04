import { mount } from '../utils';

describe('binds', () => {
  test('it should change innerText', async () => {
    const mounted = await mount('tests/binds/scripts/bind.ts');

    expect(mounted.querySelector('p')?.innerText).toBe('Bind: changed');
  });
});
