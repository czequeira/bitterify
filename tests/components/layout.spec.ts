import { mount } from '../utils';

describe('component-layout', () => {
  test('it should render aside, nav and footer', async () => {
    const mounted = await mount('tests/components/scripts/layout.ts');

    expect(mounted.querySelector('aside')).toBeTruthy();
    expect(mounted.querySelector('nav')).toBeTruthy();
    expect(mounted.querySelector('footer')).toBeTruthy();
    expect(mounted.querySelector('main')).toBeTruthy();
  });
});
