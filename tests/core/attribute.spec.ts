import { mount } from '../utils';

describe('attribute', () => {
  test('it should set and get components attributes', async () => {
    const mounted = await mount('tests/core/scripts/attribute.ts');

    const p = mounted.querySelector('p');

    expect(p?.innerText).toBe('https://example.com');
  });
});
