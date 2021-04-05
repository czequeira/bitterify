import { mount } from '../utils';

describe('component-app', () => {
  test('it should mount a app', async () => {
    const mounted = await mount('tests/components/scripts/app.ts');

    expect(mounted.querySelector('div')?.textContent).toBe('app');
  });
});
