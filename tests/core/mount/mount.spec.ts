import { mount } from '../../utils';

describe('mount', () => {
  test('it should mount a p with hello world', async () => {
    const mounted = await mount('tests/core/scripts/hello-world.ts');

    expect(mounted.querySelector('p')?.innerText).toBe('Hello world');
  });
});
