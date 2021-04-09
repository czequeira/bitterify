import { mount } from '../utils';

describe('component-a', () => {
  test('it should render a "a"', async () => {
    const mounted = await mount('tests/components/scripts/a.ts');

    expect(mounted.querySelector('a')?.innerText).toBe('link');
    expect(mounted.querySelector('a')?.getAttribute('href')).toBe(
      'https://example.com',
    );
  });
});
